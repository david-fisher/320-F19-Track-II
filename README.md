# 320-F19-Track-II
README for Track II

**Cloud Set Up:**

* Route 53:
  * Register your own custom domain name, Ex: www.orchardwatch.com
  * Routes user requests through CloudFront to S3 where our static website is hosted 
  * Connects users to our internal infrastructure   * Annual cost for domain name, and monthly costs for hosted zones
   * $12 a year for our domain, and $0.50 a month because we have one hosted zone 
* CloudFront:
 * Delivers our website to our users in an efficient high speed manner
 * Takes content stored in S3 and sends it to the user  * Easily integrated with S3 and Route 53
 * Overall cost is determined by how much data is transferred within a month with costs decreasing over larger amounts of data 
  * $0.085 per GB for first 10TB
  * $0.080 per GB for next 40TB
  * $0.060 per GB for next 100 TB
* API Gateway:
  * Create rest API calls to trigger lambda functions
  * Add methods for GET, POST , PATCH, or DELETE. Additionally an ANY method allows the use of any HTTP method, creating a single method API setup
  * Cost based on how many API calls are made (per month)
   * $1.00 for the first 300 million calls
   * $0.90 for 300+ million calls
* Lambda:
  * Triggered by API gateway, functions do work like:
   * Query database
   * Pull data from HOBOnet
   * Retrieve/Upload from/to S3
  * Charged per million requests
   * $0.20/1 million requests
   * Only charged when used
* S3:
  * Large amounts of storage for cheap
  * Stores the code for our front end, the images and long term storage
  * Redirects non-WWW domain name to WWW domain name
   * orchardwatch.com redirects to www.orchardwatch.com
  * Hosts our static website
   * Integrates with CloudFront and Route 53
  * Pricing depends on how data is stored in your bucket every month
   * $0.023 per GB for first 50 TB
   * $0.022 per GB for next 45o TB
* DynamoDB:
  * Storing data like user credentials, HOBOnet data, and that which is not in an S3 bucket
  * Queried when logging in, registering, requesting data, and when looking for ID’s of images stored in S3
  * Charged based on how much data is stored and how many requests are made
   * $1.25/million write requests
   * $0.25/million read requests 
   * Free first 25 GB
   * $0.25/GB after
* EC2: 
  * Instance of a virtual machine, used for machine learning team
  * Charged hourly for having the VM running
   * $0.0116 per hour
* CloudWatch:
  * Natively integrates into AWS services
  * Used to track resource usage across all services as well as track charges
  * Alarms can be set up to make sure HOBO data is being pulled 
  * Monitors overall health of our system

**Lambda Set Up:**
1. Install maven https://maven.apache.org/install.html
2. Navigate to the Lambda folder in terminal
3. Run “mvn package 
![](Screenshot_1.png)
![](Screenshot_2.png)
The output .jar file is located at .../Lambda/target/lambda-1.0-SNAPSHOT.jar
4. Login to AWS with an account that has permission to add/edit lambdas
5. Create the following lambda functions: register_user, get_s3_key, get_image, mobile_vertification, user_login, image_upload, hobo_data_pull, and pull_data
6. In the “Function code” section for each lambda, upload the lambda-1.0-SNAPSHOT.jar acquired earlier (all functions use the same jar).
![](Screenshot_3.png)
7. Also in the function code section, specify the handlers for each lambda function accordingly:

Function | Handler
------------ | -------------
register_user | entrypoints.UserRegistrationHandler::handleRequest
get_s3_key | entrypoints.MobileVerificationHandler::handleRequest
get_image | entrypoints.GetImagesHandlers::handleRequest
mobile_vertification | entrypoints.UserRegistrationHandler::handleRequest
user_login | entrypoints.ImageUploadHandler::handleRequest
image_upload | entrypoints.ImageUploadHandler::handleRequest
hobo_data_pull | entrypoints.HoboRegHandler::handleRequest
pull_data | pull_data

8. Ensure endpoints from API gateway have been properly mapped to the lambda functions.


**Mobile Set Up:**
1. Download and Install Android Studio:https://developer.android.com/studio
2. Clone Repo from Git
3. Run App: Start by opening Android Studio
 a. With an Emulator: 
  i. Click on list of available devices
  ii. If no emulators are set up, set up emulator:
   1. Click on AVD Manager
   2. Click on “Create Virtual Device” 
   3. Choose an android device to add and then click “next”
   4. Click on latest release and then click “next”
   5. Click finish, that device is now added to the list of device emulators
 b. With an Android Device:
  i .Connect usb/usb-c to from computer to phone
  ii. Select the device from list of devices at the top of the screen
 c. Click the run button to download and run the app onto the device of your choosing

**Machine Learning Set Up:**
1. Prerequisites:
Things you need before you run and test this part of orchardwatch software
 a. Latest version of python, pip3,  (run your code)
 b. Pip instal latest boto3 package (connect to the aws services), and other dependencies that can be found in the ServerPredict code on github
 c. Amazon EC2 instance key (connect to EC2 instance)
 d. Installed httpserver and basehttprequesthandler (fetch image from the internet)
2. Installing
 a. Clone Repo from Git
 b. Open bash shell and ssh into the AWS EC2(t2.micro) instance-
_**ssh -i ~/.ssh/MyKeyPair.pem ec2-user@your ip address**_
 c. Once this statement is executed, we have access to the EC2.
 d. Then we change directory into ML_src.
_**cd ML_src**_
 e. Download Model to EC2 instance using:
_**Wget ‘model_address’**_
 f. In ML_src, we execute the ServerPredict.py (this code is in github). 
_**Python3 ServerPredict.py**_
 g. This enables the server to start running on a portal-8001
 h .Then send a post request from another bash window to the same portal
_**curl -X POST**_ http://localhost:8001 or run the python file send_img_request.py from ML folder in github to use the lamdba teams endpoint to upload images to S3 and get a classification back.
 i. This sends the https request to the EC2 instance via get_image lambda function which then runs the model on the latest image in S3 and returns the classification in the form of a table with probabilities for each prediction.
 j. This again pushes the image back into the S3,tagged as the highest prediction it had received.

3. Testing
 a. Testing for running the code:
  i. Follow the same step as stated above, with changing the EC2 key , IP address and private key to your personal. 
  ii. Download your own model to the EC2 instance 
  iii. Test the server by starting the server and send request to it to test its functionality
 b. User acceptance test: 
  i. Prerequisites: User upload image from the front end and the pictures then goes to EC2 instance by lambdas. The dynamodb table is then instantly updated in the table “Image”
  ii. User upload image: the lambda function return 200 if this is successful.
  iii. Image prediction: the model will automatically predict the image and send it to the front end by request command via a json file, if everything goes correctly then the result should be in {body}{imageinfo}{0}{prediction}

4. Authors

Name | Role
------------ | -------------
Vigneshsai Roshan | Team Leader
Qisen Luan | Secretary
Will Murphy | Integration
David Giang | Wild Card
Nathan Ng | Customer Liason

Front End Set Up:
1. Install Node.js https://nodejs.org/en/download/
2. Clone repo from git
3. In the terminal, use ‘cd’ to change your current directory to client
4. Run ‘npm install’ in the terminal to install dependencies
5. Run ‘npm start’ to start the front end on a local server
6. Open a browser to localhost:3000 to view the code running
.

