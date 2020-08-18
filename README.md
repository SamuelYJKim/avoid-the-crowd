# Avoid the Crowd

Avoid the Crowd is a full stack web application that assists users in finding places of interest that are the least crowded. We wanted to create this app, especially during this pandemic, because we want the general public to find places where they can safely pick up groceries, get food at restaurants, and much more. After looking through many services, we were unsatisfied with the current functionality that they provide.

## How to Use

The user can type in a place of interest they want to find. Once they search, our app returns up to 10 of the closest locations in order of busyness from least to greatest. From there, the user can look through the listings, each of which contains the name, address, a photo, and how busy the location is.

## Try it Now

https://avoid-the-crowd.herokuapp.com/

## Installation 

#### Setting up frontend <br/>
Once you download the repo to your local machine, download and install Node 14.8.0 to your computer. Once Node is installed, run npm install react to download and install react.

#### Setting up backend <br/>
First set up a virtual environment in the api folder. Then run pip install -r requirements.txt in the same folder to install all dependencies.

#### Setting up config.py <br/>
First, go to https://developers.google.com/maps/documentation/javascript/get-api-key to get an api key for Google Maps Platform. 
Next, go to https://besttime.app/ and sign up for a BestTime account. Once you make a BestTime account, find the private and public key.
To create the config.py file, open up a text editor to copy and paste the lines below while filling in the blanks with your own api keys. Once the blanks are filled in, save the file as a .py file and place in the api folder 

gmap_api_key = "Fill" <br/>
best_times_private_key = "Me" <br/>
best_times_public_key = "In" <br/>

## Running App Locally

To turn on frontend, load a terminal session within the avoid-the-crowd folder and run npm start. Once that is done, navigate into the api folder and turn on virtual environment. After entering virtual environment, type in flask run to start web server. From there, the web app should start running on https//localhost:3000.

## Languages and Tools 

Languages: JavaScript, Python, HTML, CSS<br/>
Tools: Node.js, Flask, Google Maps API, BestTime API, React Library, Material UI

## Credits

Created by Nitesh Chetry, Samuel Kim, Joon Kim, Ali Byott, and Brian Tran


