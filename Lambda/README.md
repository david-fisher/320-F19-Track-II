
# Fisermen-Lambda
Click [here](https://github.com/david-fisher/320-F19-Track-II/wiki/Team-4:-The-FISHERmen) to see our team members.

**Jump To Functions:**

[UserRegistrationHandler](#userregistrationhandler)

[UserLoginHandler](#userloginhandler)


[MobileVerificationHandler](#mobileverificationhandler)

## Architecture
![](https://github.com/david-fisher/320-F19-Track-II/blob/master/Lambda/pics/UML.png)
### Process
1. Request JSON is automatically transfered by AWS API Gateway to `HashMap<String,String>`
2. Class `support.RequestParser` parse input HashMap to request obejct that implemented `RequestInterface` through reflection. 
3. Handler methods execute business logic.
4. Return response accordingly.
5. Returned Object is parsed by AWS API Gateway and send back to front end.

## API Document
Author(s): [@charlescao460](https://github.com/charlescao460)

**Since AWS Lambda has no directly exposed endpoints, all hanlders need to be configured accordingly in API Gateway.**

**Notice:**

All Attributes Indicated Below Are Necessary In Request Body.

If the documents says attributes are optional, it means you can put empty string as their values,

you'll still need to put them in request body.

-----

### UserRegistrationHandler

Register user from website.

**Java Entry Point**: `entrypoints.UserRegistrationHandler::handleRequest`

**API Gatway EndPoints:** Waiting For Cloud Team

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

Used for web front end. Will return a token (works like cookies) when succeed.

`body.token` will then be used as credentials when required.

Token is valid for 24 hours, it was generated through AES encryption and encoded through Base64.

**API Gatway EndPoints:** Waiting For Cloud Team

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

Example:
```json
{
  "body": {
    "message": "OK",
    "token": "YBpn61KXOI5mbZUIElY5CT24ZIVflWU1DhD6ExCwcvk="
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
    "message": "Email and Password do not match."
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

**API Gatway EndPoints:** Waiting For Cloud Team

**Request Format**:
```json
{
  "MobileKey": "9a5b59"
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
    "message": "Cannot find user with such key!"
  },
  "headers": {
    "X-Custom-Header": "application/json",
    "Content-Type": "application/json"
  },
  "statusCode": 401
}
```

