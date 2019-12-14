from imageai.Prediction import ImagePrediction
import os
import requests
import json
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import numpy as py
import boto3
from PIL import Image
from urllib.parse import unquote
from http.server import HTTPServer, BaseHTTPRequestHandler
# from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer

execution_path = os.getcwd()
prediction = ImagePrediction()
prediction.setModelTypeAsResNet()
#prediction.setModelTypeAsSqueezeNet()
prediction.setModelPath(os.path.join(execution_path, "resnet50_weights_tf_dim_ordering_tf_kernels.h5"))
prediction.loadModel()
url = 'https://s2.ax1x.com/2019/12/15/QWs7ZR.jpg'

def getImg():
    res = requests.get (url)
    print(res.headers)
    return res.content

def isWorking():
    imgData = getImg()
    fileExtension = url.split('.')[-1]
    fileName = "1." + fileExtension
    with open(fileName, "wb") as handler:
        handler.write(imgData)
    im = Image.open(os.path.join(execution_path, fileName))
    im.save("1.png")
    fileName = "1.png"
    predictions, probabilities = prediction.predictImage(os.path.join(execution_path, fileName), result_count=5)
    for eachPrediction, eachProbability in zip(predictions, probabilities):
        print(eachPrediction , " : " , eachProbability)
    return (predictions, probabilities)

class Serve (BaseHTTPRequestHandler): 
    def do_POST(self):
        print("isdog")
        predictions = isWorking()
        self.send_response(200)
        self.send_header('Content-type','text/html')
        self.end_headers()
        self.wfile.write(bytes(json.dumps(predictions), "utf8"))
        self.wfile.write(bytes("Hello Team", "utf8"))
        return

httpd = HTTPServer(('localhost', 8001), Serve)
print ("serving on port 8001")
httpd.serve_forever()

