# urlshortener
url shortener 

Local Setup:

Prerequisites: Must have docker installed and running on your machine

Go to project directory and run the commands:

docker-compose build

docker-compose up

Use an HTTP Client (eg. Postman) and make a post request to localhost:3001/shorten with a json request body of 

{ "url" : "https://urlofyourchoice.com" }  

You will be returned a response body with the value "shortened". Copy the shortened url and enter it in your browser url at localhost:3001/{shortened} 
