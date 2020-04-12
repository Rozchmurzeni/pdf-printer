# PDF Printer
This repository contains a definiton of a stack with API Gateway that uses lamba and headless chrome to convert your html to pdf.
It utilizes [chrome-aws-lambda](https://github.com/alixaxel/chrome-aws-lambda) to 

## Limitations
Due to the API Gateway and AWS Lambda limitation the file both html and pdf have to be under 6 megabytes.

## Get started
You will need npm.

```
    npm install chrome-aws-lambda --save-prod
    npm install puppeteer-core --save-prod
```
This will install binary for the latest stable release of puppeteer and appropriate version of puppeteer-core.

```
    npm install
```
To install dependencies

### Deployment

```
    aws cloudformation package --template-file serverless.yaml --output-template-file serverless-out.yaml --s3-bucket <YOUR_DEPLOYMENT_BUCKET_NAME> --s3-prefix pdf-deployment-package 
    aws cloudformation deploy --template-file serverless-out.yaml --stack-name <STACK_NAME> --capabilities CAPABILITY_IAM
```
Those two commands will package and deploy this application. Remember to change values for deployment bucket name and stack name.


## Request format
```
{
    "format": "A4",
    "document": "base64_encoded_html"
}
```

#### Format

The format options are:

Value | Medium size
------------ | -------------
Letter| 8.5in x 11in
Legal| 8.5in x 14in
Tabloid| 11in x 17in
Ledger| 17in x 11in
A0| 33.1in x 46.8in
A1| 23.4in x 33.1in
A2| 16.54in x 23.4in
A3| 11.7in x 16.54in
A4| 8.27in x 11.7in
A5| 5.83in x 8.27in
A6| 4.13in x 5.83in


## Necessary modifications
To get all colours printed correctly you have to add add -webkit-print-color-adjust in the styles section of your document.
Like so:
```html
<style>
		html {
		  -webkit-print-color-adjust: exact;
		}
        ...
</style>
```

## TODO
* Add support for all parameters supported by puppeteer: https://github.com/puppeteer/puppeteer/blob/v2.1.1/docs/api.md#pagepdfoptions
* Add support for larger files
* Add support for multi file documents