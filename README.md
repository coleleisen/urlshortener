 # urlshortener
url shortener 

Local Setup:

Prerequisites: Must have docker installed and running on your machine

Go to project directory and run the commands:

docker-compose build

docker-compose up


Frontend use

Go to localhost:3000 to access react application

Type into URL text field what website you would like to link to

If Custom is not selected it will auto generate the short url or if you check the switch you can make a custom url

Add /redirect/{shorturl} and it will redirect to the backends redirect using react router

Or you can simply type localhost:3001/{shorturl} into the browser



Backend Only use

Use an HTTP Client (eg. Postman) and make a post request to localhost:3001/shorten with a json request body of 

{ "url" : "https://urlofyourchoice.com" }  

You will be returned a response body with the value "shortened". Copy the shortened url and enter it in your browser url at localhost:3001/{shortened} 
