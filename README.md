# simple-node-js-react-npm-app

The repository contains a simple Node.js and React application which generates
a web page with the content "Welcome to React" and is accompanied by a test to
check that the application renders satisfactorily.

The `jenkins` directory contains an example of the `Jenkinsfile` (i.e. Pipeline)
you'll be creating yourself during the tutorial and the `scripts` subdirectory
contains shell scripts with commands that are executed when Jenkins processes
the "Test" and "Deliver" stages of your Pipeline.


1.Created s3 bucket to deploy the sample react project in AWS
In properties:
  Static website hosting: enabled
In Permissions: Unblock public access

/*Resource is bucket name*/
    Add Bucket policy : 
   ` {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::simple-react-s3/*" 
        }
    ]
}`
2.Create build using code build
  **Source:**Github
  **Build Spec:** Use a **buildspec** file: give **yml** file name which in github
  **Artifact**: S3
  Add policies in IAM for build service role in read -get object and write -put object
3 . Create Pipeline
    **Source :** Github 
    In Triggers branches select as `main` branch
    **Code Build:** select created code build in the list
    **Code Deploy** : Select S3 Bucket
