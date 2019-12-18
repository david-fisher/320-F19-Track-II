from imageai.Prediction import ImagePrediction
import os
import requests
import json
import boto3
from PIL import Image
from http.server import HTTPServer, BaseHTTPRequestHandler
from boto3.dynamodb.conditions import Key, Attr
​
'''
This code runs on the EC2 to serve predictions
​
On a post it serves a prediction on the most recently uploaded image in S3,
and updates its prediction and annotation values in dynamoDB.
​
It is set up to be called by lambda whenever an image is uploaded to S3,  
but can take regular post requests as well. 
'''
​
#Set up model 
execution_path = os.getcwd()
prediction = ImagePrediction()
prediction.setModelTypeAsResNet()
prediction.setModelPath(os.path.join(execution_path, "resnet50_weights_tf_dim_ordering_tf_kernels.h5"))
prediction.loadModel()
​
#Set up connection with S3 images table
dynamodb = boto3.resource('dynamodb')
s3 = boto3.client('s3')
table = dynamodb.Table('Image')
​
def getUnannotatedImages():
    unannotatedImages = table.scan(FilterExpression=Attr('Annotated').eq(False))
    if (len(unannotatedImages["Items"]) == 0):
        #continue nothing needs to be predicted 
        print("no images to predict")
        return None
    return unannotatedImages 
   
def downloadUnannoatedImg( unannotatedImages ):
    try:
        highest=0
        i = len(unannotatedImages["Items"])
        theK = 0
        for k in range(i):
            x = unannotatedImages["Items"][k]["Timestamp"]
            if x >= highest:
                highest = x
                theK = k
        firstUnannotatedImg = unannotatedImages["Items"][theK]
        file_name = firstUnannotatedImg['S3'].split('/')[-1]
        s3.download_file('orchardwatchimages', file_name, 'test.jpg')
        imageObject = Image.open("test.jpg")
        return imageObject
    except IOError:
        print(IOError)
        return "image could not be opened"
​
​
def predictImage(imageFile):
    print(imageFile)
    imageFile.save("1.png")
    fileName = ("1.png")
    predictions, probabilities = prediction.predictImage(os.path.join(execution_path, fileName), result_count=5)
    for eachPrediction, eachProbability in zip(predictions, probabilities):
        print(eachPrediction , " : " , eachProbability)
    return (predictions, probabilities)
​
class Serve (BaseHTTPRequestHandler): 
    def do_POST(self):  
        unannotatedImages = getUnannotatedImages()
        if (unannotatedImages is None):
            self.send_response(206)
            self.send_header('Content-type','text/html')
            self.end_headers()
            self.wfile.write(bytes("No new images to predict", "utf8"))
            return
        print(unannotatedImages)
        imageObject = downloadUnannoatedImg( unannotatedImages ) 
        print(imageObject)
        imagePredictions = predictImage(imageObject)
        response = table.update_item(
            Key = {
                'ID': unannotatedImages["Items"][0]['ID']
                #'Annotated': 'FALSE',
            },
            UpdateExpression = 'SET Prediction = :val1, Annotated = :val2',
            ExpressionAttributeValues={
                ':val1': imagePredictions[0][0],
                ':val2': True
            }
        )
        self.send_response(200)
        self.send_header('Content-type','text/html')
        self.end_headers()
        self.wfile.write(bytes("This image was classified as a ", "utf8"))
        self.wfile.write(bytes(json.dumps(imagePredictions[0][0]), "utf8"))
        os.remove("1.png")
        os.remove("test.jpg")
        return
​
httpd = HTTPServer(('',8001), Serve)
print ("serving on port 8001")
httpd.serve_forever()