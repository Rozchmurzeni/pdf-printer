# PDF Printer
This repository contains a definiton of a stack with API Gateway that uses lamba and headless chrome to convert your html to pdf.
It utilizes [chrome-aws-lambda](https://github.com/alixaxel/chrome-aws-lambda) to obtain a headless chrome.
Underneath it loads the website that is sent to chrome and prints it, returning you a base64 encoded pdf.

## Limitations
Due to the [API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/limits.html) and [AWS Lambda limitation](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html) html sent to the API has to be under 6 megabytes.

## Get started
You will need npm.

```
    npm install
```
To install dependencies and code away! 

## Deployment

```
    npm run package -- --s3-bucket <YOUR_DEPLOYMENT_BUCKET_NAME> 
    npm run deploy -- --stack-name <STACK_NAME>
```
Those two commands will package and deploy this application. 

## Usage

### Request
```
{
    "format": "A4",
    "document": "base64_encoded_html"
}
```
With this payload you have to issue POST under `/print` endpoint in your aws gateway.

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
* [Add support for all parameters supported by Page.pdf()](https://github.com/Rozchmurzeni/pdf-printer/issues/1)
* Add support for larger files
* Add support for multi file documents