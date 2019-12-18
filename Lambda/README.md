
# Fisermen-Lambda
Click [here](https://github.com/david-fisher/320-F19-Track-II/wiki/Team-4:-The-FISHERmen) to see our team members.

**Jump To Functions:**

[UserRegistrationHandler](#userregistrationhandler)

[UserLoginHandler](#userloginhandler)


[MobileVerificationHandler](#mobileverificationhandler)

[ImageUploadHandler](#ImageUploadHandler)

[GetImagesHandlers](#GetImagesHandlers)

[HoboPullDataHandler](#HoboPullDataHandler)

## Architecture
![](https://github.com/david-fisher/320-F19-Track-II/blob/master/Lambda/pics/UML.png)
### Process
1. Request JSON is automatically transfered by AWS API Gateway to `HashMap<String,String>`
2. Class `support.RequestParser` parse input HashMap to request obejct that implemented `RequestInterface` through reflection. 
3. Handler methods execute business logic.
4. Return response accordingly.
5. Returned Object is parsed by AWS API Gateway and send back to front end.

## API Document
Author(s): [@charlescao460](https://github.com/charlescao460),[@lwbhahahaha](https://github.com/lwbhahahaha)

**Since AWS Lambda has no directly exposed endpoints, all hanlders need to be configured accordingly in API Gateway.**

**Notice:**

All Attributes Indicated Below Are Necessary In Request Body.

If the documents says attributes are optional, it means you can put empty string as their values,

you'll still need to put them in request body.

-----

### UserRegistrationHandler

Register user from website.

**Java Entry Point**: `entrypoints.UserRegistrationHandler::handleRequest`

**API Gatway EndPoints:** POST `https://mt7pf3aohi.execute-api.us-east-2.amazonaws.com/test/register-user`

**Request Format**:
```json
{
  "Email": <String>,
  "Role": "PUBLIC",
  "FirstName": <String>,
  "LastName": <String>,
  "Password": <String>
}
```
`Email`: User's Email, will be used as the primary identifier of user. Must in a valid email format.

`Role`: User's Role, Currently only support PUBLIC.

`FirstName`: User's first name.

`LastName`: User's last name.

`Password`: Password used to log in on websites.

**Response Format**

Success Response: HTTP-200(OK)

Failure Response:

All failed response will contain error message in `body.message`.

HTTP-400(BAD REQUEST) If request is not in correct format.

HTTP-500(INTERNAL SERVER ERROR) If the function does not work as expected.


```json
{
  "body": {
    "message": "OK"
  },
  "headers": {
    "X-Custom-Header": "application/json",
    "Content-Type": "application/json"
  },
  "statusCode": 200
}
```

-----

### UserLoginHandler
**Java Entry Point**: `entrypoints.UserLoginHandler::handleRequest`

Used for web front end. Will return user info without password and a token (works like cookies) when succeed.

`body.token` will then be used as credentials when required.

Token is valid for 24 hours, it was generated through AES encryption and encoded through Base64.

**API Gatway EndPoints:** POST `https://mt7pf3aohi.execute-api.us-east-2.amazonaws.com/test/user-login`

**Request Format**:
```json
{
  "Email": <String>,
  "Password": <String>
}
```
`Email`: User's email.
`Password`: User's passowrd corresponding to emails.

**Response Format**

Success Response: HTTP-200(OK)

`body.token`: The token that valid for 24 hours as a credentials.

`body.userinfo`: The user info.

Example:
```json
{
  "body": {
    "userinfo": {
      "Role": "PUBLIC",
      "LName": "LName",
      "EMail": "email2@test.com",
      "FName": "FName"
    },
    "message": "OK",
    "token": "VoVsgAcbWNsUlwCgxtXHtDTOr6p0vSP/tjho+699C8Q="
  },
  "headers": {
    "X-Custom-Header": "application/json",
    "Content-Type": "application/json"
  },
  "statusCode": 200
}
```


Failure Response:

All failed response will contain error message in `body.message`.

HTTP-400(BAD REQUEST) If request is not in correct format.

HTTP-500(INTERNAL SERVER ERROR) If the function does not work as expected.

HTTP-401(UNAUTHORIZED) If the token is incorrect or expired.

Example
```json
{
  "body": {
    "message": "UNAUTHORIZED:Email and Password do not match."
  },
  "headers": {
    "X-Custom-Header": "application/json",
    "Content-Type": "application/json"
  },
  "statusCode": 401
}
```

---

### MobileVerificationHandler

**Java Entry Point**: `entrypoints.MobileVerificationHandler::handleRequest`

Used for the first-time-sign-in of mobile users.

Authorized users are given a short access key `MobileKey`, and when they first time using our APP, they put their keys in. 

And the APP will call this function for verification. If succeed, it will get user's information, togther with a **new key**, which will be used as future credentials.

Thus, mobile APP should store that new key securely and permanently.

**API Gatway EndPoints:** GET `https://mt7pf3aohi.execute-api.us-east-2.amazonaws.com/test/mobile-verification`

**Request Format**:
```json
{
  "MobileKey": <String>
}
```
`MobileKey`: Authorized user's key that are distributed by our system administrator.

**Response Format**

Success Response: HTTP-200(OK)

`body.key`: A permanent mobile key for this user. It is required for uploading images. Mobile APP should store that new key securely and permanently.

Example:
```json
{
  "body": {
    "Role": "GROWER",
    "Email": "testGrower@test.com",
    "message": "OK",
    "Key": "8a09e3ce-7b43-4ac8-810a-2370365e6f2a",
    "Name": "TestGrowerF TestGrowerL"
  },
  "headers": {
    "X-Custom-Header": "application/json",
    "Content-Type": "application/json"
  },
  "statusCode": 200
}
```


Failure Response:

All failed response will contain error message in `body.message`.

HTTP-400(BAD REQUEST) If request is not in correct format.

HTTP-500(INTERNAL SERVER ERROR) If the function does not work as expected.

HTTP-401(UNAUTHORIZED) If the `MobileKey` is incorrect.

Example
```json
{
  "body": {
    "message": "UNAUTHORIZED:Cannot find user with such key!"
  },
  "headers": {
    "X-Custom-Header": "application/json",
    "Content-Type": "application/json"
  },
  "statusCode": 401
}
```

---

### ImageUploadHandler

**Java Entry Point**: `entrypoints.ImageUploadHandler::handleRequest`

Upload images for both mobile end and front end.

Image will be stored in JSON as a base64-encoded string.

A example base64 encoding string can be easily generated by PowerShell:

The image must be encoded into base64 directly in **binary** form.

```powershell
$bytes = [System.IO.File]::ReadAllBytes("Absolute Path To JPG/PNG")
$EncodedText =[Convert]::ToBase64String($bytes)
$EncodedText
```

**API Gatway EndPoints:** POST `https://mt7pf3aohi.execute-api.us-east-2.amazonaws.com/test/image-upload `

**Request Format**:
```json
{
  "Filename": <String>,
  "Token": <String>,
  "MobileKey": <String>,
  "Image": <String>
}
```
`Filename`: Filename of images, must end with `.png` or `.jpg`, should not contains any non-alphanumericals.

`Token`: Token generated from [UserLoginHandler](#userloginhandler). If you are not web end, use empty string. **Do not omit.**

`MobileKey`: MobileKey returend by [MobileVerificationHandler](#mobileverificationhandler). It should be already stored safely in user's phone. If you are not mobile end, use empty string. **Do not omit.**

`Image`: Base64-Encoded Images. Must in PNG or JPEG format. Must be encoded directly from bytes. Should not contains any headers.

**Response Format**

Success Response: HTTP-200(OK)

`body.key`: A permanent mobile key for this user. It is required for uploading images. Mobile APP should store that new key securely and permanently.

Example:
```json
{
  "statusCode": 200,
  "headers": {
    "X-Custom-Header": "application/json",
    "Content-Type": "application/json"
  },
  "body": "{\"message\":\"OK\"}",
  "base64Encoded": false
}
```


Failure Response:

All failed response will contain error message in `body.message`.

HTTP-400(BAD REQUEST) If request is not in correct format.

HTTP-500(INTERNAL SERVER ERROR) If the function does not work as expected. Or if your image is not in correct base64 format.

HTTP-401(UNAUTHORIZED) If the `MobileKey` or `Token` is incorrect or expired.

Example
```json
{
  "body": {
    "message": "UNAUTHORIZED:Token/MobileKey incorrect!"
  },
  "headers": {
    "X-Custom-Header": "application/json",
    "Content-Type": "application/json"
  },
  "statusCode": 401
}
```

----


### GetImagesHandlers

**Java Entry Point**: `entrypoints.GetImagesHandlers::handleRequest`

Get Images From S3 and Database. ML results also returned here.

Requested through a time-span in [Unix Epoch](https://en.wikipedia.org/wiki/Unix_time) format.

Returned objects consistents of two fileds, 

`body.Images` is a list of links to S3, pre-signed links are valid for 1 hour.

`body.ImageInfo` is a list of json obejct, each of them contains information about owner and machine learning result.


**API Gatway EndPoints:** `https://mt7pf3aohi.execute-api.us-east-2.amazonaws.com/test/get-image`

**Request Format**:
```json
{
  "StartTime": <String>
  "EndTime": <String>
}
```
`StartTime`: A string contains Start time of time span in  [Unix Epoch](https://en.wikipedia.org/wiki/Unix_time) format. 

`EndTime`: A string contains Start time of time span in  [Unix Epoch](https://en.wikipedia.org/wiki/Unix_time) format.

**Response Format**

Success Response: HTTP-200(OK)



Example:
```json
{
  "body": {
    "Images": [<String>,<String>,...],
    "ImageInfo":[ 
    {
        "S3": <String>,
        "Annotated": <Boolean>,
        "Prediction": <String>,
        "ID": <Int>,
        "Uploader": <String>,
        "Timestamp": <Number>
      },...]
  }
}
```

`Images`: A list of links to images, pre-signed links are valid for 1 hour. Put the links in broswer can directly view images.

`ImageInfo.S3`: S3 path of file.

`ImageInfo.Annotated`: Whether the image was annotated by machine learning.

`ImageInfo.Pridiction`: Machine learning's result.

`ImageInfo.ID`: Image's uid.

`ImageInfo.Uploader`: Uploader of image.

`ImageInfo.Timestamp`: The time when image was uploaded, in Unix Epoch format.

Failure Response:

All failed response will contain error message in `body.message`.

HTTP-400(BAD REQUEST) If request is not in correct format.

HTTP-500(INTERNAL SERVER ERROR) If the function does not work as expected. Or if your image is not in correct base64 format.


Example
```json
{
  "body": {
    "message": "BAD REQUEST:Missing necessary attribute 'startTime'!"
  },
  "headers": {
    "X-Custom-Header": "application/json",
    "Content-Type": "application/json"
  },
  "statusCode": 400
}
```


-----
### hoboPullSensorHandler

Pulling data from Hobonet. 

It should be triggered periodically. 

**Java Entry Point**: `entrypoints.HoboRegHandler::handleRequest`

**API Gatway EndPoints:** N/A

**Request Format**:


```json
{
}
```

**Response Format**


Success Response: HTTP-200(OK)

Failure Response:

All failed response will contain error message in `body.message`.

HTTP-500(INTERNAL SERVER ERROR) If the function does not work as expected.


```json
{
  "body": {
    "message": "OK"
  },
  "headers": {
    "X-Custom-Header": "application/json",
    "Content-Type": "application/json"
  },
  "statusCode": 200
}
```

-----
### HoboPullDataHandler

**Java Entry Point**: `entrypoints.HoboPullDataHandler::handleRequest`

Get Hobo data from database.

Requested through a time-span in [Unix Epoch](https://en.wikipedia.org/wiki/Unix_time) format.

Returned objects consistent of one filed, 

`Hobo info:` is the key to a list(`List<Map<String, Object>>`) of hobo data.

**API Gatway EndPoints:** `https://mt7pf3aohi.execute-api.us-east-2.amazonaws.com/test/pull-data`

**Request Format**:
```json
{
  "StartTime": <String>,
  "EndTime": <String>
}
```
`StartTime`: A string contains Start time of time span in  [Unix Epoch](https://en.wikipedia.org/wiki/Unix_time) format. 

`EndTime`: A string contains Start time of time span in  [Unix Epoch](https://en.wikipedia.org/wiki/Unix_time) format.
**Response Format**

Success Response: HTTP-200(OK)

Failure Response:

All failed response will contain error message in `body.message`.

HTTP-400(BAD REQUEST) If request is not in correct format.

HTTP-404(NOT FOUND) If no data is found within the timestamp period.

HTTP-500(INTERNAL SERVER ERROR) If the function does not work as expected.


```json
{
  "body": {
    "Hobo info": {
                     "Epochtime": 1576475402,
                     "HoboID": "454-788",
                     "Humidity": 7,
                     "LeafWetness": 9,
                     "Rainfall": 83,
                     "SoilMoisture": 43,
                     "SolarRadiation": 323413,
                     "Temperature": 92,
                     "Wind": 6
                   }
  },
  "headers": {
    "X-Custom-Header": "application/json",
    "Content-Type": "application/json"
  },
  "statusCode": 200
}
```

