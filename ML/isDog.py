from imageai.Prediction import ImagePrediction
import os
import requests
import json
from PIL import Image
from urllib.parse import unquote
from http.server import HTTPServer, BaseHTTPRequestHandler
execution_path = os.getcwd()
prediction = ImagePrediction()
prediction.setModelTypeAsResNet()
#prediction.setModelTypeAsSqueezeNet()
prediction.setModelPath(os.path.join(execution_path, "resnet50_weights_tf_dim_ordering_tf_kernels.h5"))
prediction.loadModel()
def fetch_image(url):
    res = requests.get(url, headers={ "Authorization": ('Bearer ' + "xoxp-617047354033-735720758690-745687206290-849754380d41b367f81e9b2102dffbb9")}, stream=True)
    print("I GOT SOME DATA BACK:")
    print(res.headers)
    return res.content
def isDog(url):
    imgData = fetch_image(url)
    fileExtension = url.split('.')[-1]
    fileName = "1." + fileExtension
    with open(fileName, "wb") as handler:
        handler.write(imgData)
    im = Image.open(os.path.join(execution_path, fileName))
    im.save("1.png")
    fileName = "1.png"
    predictions, probabilities = prediction.predictImage(os.path.join(execution_path, fileName), result_count=5 )
    for eachPrediction, eachProbability in zip(predictions, probabilities):
        print(eachPrediction , " : " , eachProbability)
    return (predictions, probabilities)
class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        contentLen = int(self.headers['Content-Length'])
        postBody = self.rfile.read(contentLen).decode('utf-8')
        print("POST BODY:")
        print(unquote(postBody))
        print("END OF POST BODY")
        bodyTokens = postBody.split("\n")
        self.send_response(200)
        self.end_headers()
        results = isDog(unquote(bodyTokens[0].split("=")[1].strip()))
        self.wfile.write("{".encode('utf-8'))
        for pred, prob in zip(results[0], results[1]):
            self.wfile.write(("\"" + str(pred) + "\":\"" + str(prob) + "\",").encode('utf-8'))
        self.wfile.write(("\"numResults\":\"" + str(len(results[0])) + "\"}").encode('utf-8'))
httpd = HTTPServer(('', 8000), SimpleHTTPRequestHandler)
httpd.serve_forever()