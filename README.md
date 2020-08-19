# Avoid the Crowd

Avoid the Crowd is a full stack web application that assists users in finding places of interest that are the least crowded. We wanted to create this app, especially during this pandemic, because we want the general public to find places where they can safely pick up groceries, get food at restaurants, and much more. After looking through many services, we were unsatisfied with the current functionality that they provide.

## Try it Now

https://avoid-the-crowd.herokuapp.com/

## How to Use

The user can type in a place of interest they want to find. Once they search, our app returns up to 10 of the closest locations in order of busyness from least to greatest. From there, the user can look through the listings, each of which contains the name, address, a photo, and how busy the location is.


## Installation 

#### Setting up frontend <br/>
Once you download the repo to your local machine, download and install Node 14.8.0 to your computer. Once Node is installed, run 
```
npm install react
```

#### Setting up backend <br/>
First set up a virtual environment in the api folder. Then run this command in the same folder to install all dependencies.
```
pip install -r requirements.txt
```

#### Setting up config.py <br/>
First, go to https://developers.google.com/maps/documentation/javascript/get-api-key to get an api key for Google Maps Platform. 
Next, go to https://besttime.app/ and sign up for a BestTime account. Once you make a BestTime account, find the private and public key. <br/>
<br/>
To create the config.py file, open up a text editor to copy and paste the lines below while filling in the blanks with your own api keys. Once the blanks are filled in, save the file as a .py file and place in the api folder 
```
gmap_api_key = "Fill" 
best_times_private_key = "Me"
best_times_public_key = "In"
```
## Running the App Locally

To turn on frontend, load a terminal session within the avoid-the-crowd folder and run this command. 
```
npm start
```
Once that is done, navigate into the api folder and turn on virtual environment.
### For Linux/Unix Systems
```
source <virtual env name>/bin/activate
```

### For Windows Systems
```
source <virtual env name>\scripts\activate
```

After entering virtual environment, type in this command to start web server.
```
flask run
```
From there, the web app should start running on https://localhost:3000.

## Languages and Tools 

Languages: JavaScript, Python, HTML, CSS<br/>
Tools: Node.js, Flask, Google Maps API, BestTime API, React Library, Material UI

## Credits

Created by Nitesh Chetry, Samuel Kim, Joon Kim, Ali Byott, and Brian Tran


