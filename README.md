# Simple Node JS and React App


1. Created s3 bucket to deploy the sample react project in AWS

In properties:
  Static website hosting: enabled
In Permissions: Unblock public access

Add Bucket policy : 
   
    {
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
}


2. Create build using code build

  **Source:**Github
  
  **Build Spec:** Select  `Use a buildspec file`: give `yml` file name which in github
  
  **Artifact**: S3
  
  Add policies in IAM for build service role in read -`GetObject` and write -`PutObject`

3. Deploy

   Select S3 Bucket
  

    

    
