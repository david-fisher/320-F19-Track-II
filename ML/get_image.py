import requests
import base64 
import json 
import sys 
import time 
​
'''
Port this code to javascript. 
​
Triggered by frontend predict button press for predict image.
​
filename passed in by command line represents file uploaded by app user. 
'''
​
#### Uploading image and encodeing in 64 byte no headers
img  = sys.argv[1]
with open(img, "rb") as image_file:
     encoded_str= base64.b64encode(image_file.read())
     encoded_image = encoded_str.decode("utf-8")
  
​
#### Lambda Team post image endpoint call 
post_url = 'https://mt7pf3aohi.execute-api.us-east-2.amazonaws.com/test/image-upload'
post_body = {
  "Filename": "testML10.jpg",
  "Token": "",
  "MobileKey": "<placeholder>",
  "Image": str(encoded_image),
}
unix_timestamp = int(time.time()-50)
req_post_image = requests.post(post_url, json=post_body, verify = True)
print(req_post_image.status_code)
​
​
##### Lambda Team get image endpoint
get_body = {
    "StartTime": unix_timestamp,
    "EndTime":"999999999999"
}
time.sleep(4)
req_get = requests.get("https://mt7pf3aohi.execute-api.us-east-2.amazonaws.com/test/get-image", json=get_body, headers={"Content-Type": "application/json"})  
​
### this is the prediction 
most_recent_uploaded_index = len(req_get.json()['body']['Images'])-1
print(req_get.json()['body']['ImageInfo'][most_recent_uploaded_index]['Prediction'])
​