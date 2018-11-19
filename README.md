# Nick Bansal - Comic News (Back end)
This project showcases my understanding of MongoDB, through production, development and testing. The site will be deployed through Heroku using MLabs

## Back End RESTful API

Comic News is a news aggregation demo loosely based on Reddit. This API was built during week six of the Northcoders' Full Stack Developer Course.

This project aims to demonstrate some of the skills learnt in four weeks of back end study including:

* JavaScript programming
* building a RESTful Web API to respond to HTTP requests
* storing data and interacting with databases
* Test Driven Development

## Useful Links

* NodeJS - https://nodejs.org/en/
* ExpressJS - https://expressjs.com/
* Mocha - https://mochajs.org/
* Mongoose - https://mongoosejs.com/

## Using Comic News - Backend

A working example of this API is published at http://agile-bastion-11504.herokuapp.com/api

Heroku free hosting can be a little slow to start so please allow for this when starting the application.

## Endpoints

The API provides JSON responses to HTTP request methods relating to Articles, Comments, Topics and Users as described on the API.

### Articles
Articles may be retrieved or added using the appropriate GET or POST HTTP method.

It's possible to retrieve all articles or articles filtered by topic.

Comments may be posted to an article on this endpoint.

### Comments
Comment votes may be incremented or decremented using a PATCH method.

A comment may be deleted using DELETE.

### Topics
Topics may be retrieved or added using the appropriate GET or POST method.

### Users
Access to every user can be retrieved from this endpoint as well as a single user object.

### Errors
Bad route, request and database errors result in the relevant 400/500 response headers and an error message in the JSON response body.

Express's next() method is used to handle errors.

## Seeding Functions
The original seed data for this project did not contain images for the articles. To make the front end more visually appealing, I've added a function to the Article model to insert a random image when an Article object is created.

I've also added random vote counts to Article objects in order to demonstrate sorting by vote count on the front end.

## Installing a Local Copy
These instructions will help you to get a copy of NC News up and running on your local machine for testing purposes.

### Installing
Before installing this project, ensure you have this software installed:

* Node.js 10.6.0
* MongoDB 3.4.17

Duplicate or fork this repository from https://github.com/NickBansal/Comic-News-Backend.

Inside this new directory, install the required NPM packages:

```js
$ npm install 
```

## Seed the Database
Before seeding the database, ensure you have MongoDB running. In a separate CLI instance run the command:
```js
$ mongod
```

Data is stored in the ./seed/data directory in JSON format. To seed your database with this data, run this command in your project CLI:
```js
$ npm run seed:dev
```

## Run the Application
To start the application, run this command in the CLI:
```js
npm run dev
```

## View Endpoints
A HTML summary of API endpoints is displayed at http://agile-bastion-11504.herokuapp.com/api/.

As an example, make a GET request to http://agile-bastion-11504.herokuapp.com/api/articles.

The /api/articles endpoint will return a JSON array of article objects in this format:

```js
{
  "articles": [
    {
      "_id": "5b794cd225a65452d9155364",
      "votes": 0,
      "title": "Running a Node App",
      "created_by": {
        "_id": "5b794cd225a65452d9155363",
        "username": "jessjelly",
        "name": "Jess Jelly",
        "avatar_url": "https://s-media-cache-ak0.pinimg.com/564x/39/62/ec/3962eca164e60cf46f979c1f57d4078b.jpg",
        "__v": 0
      },
      "body": "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
      "created_at": "2016-08-18T12:07:52.389Z",
      "belongs_to": "coding",
      "image_url": "https://picsum.photos/g/600/300?image=30",
      "votes": 51
      "__v": 0,
      "comments": 8
    }
  ]
}
```
## Running the Tests
Automated tests for each endpoint are located in ./spec/index.spec.js.

Run these tests using the command:
```js
npm run test
```
Results are then displayed for each test

## End to End Testing
Tests use SuperTest, Mocha and Chai for assertion based testing.

Tests use their own database as configured in .config/index.js. This database is reseeded before each test using data that is stored in the ./seed/testData directory in JSON format.

Endpoints in a RESTful API must respond to HTTP verbs in the correct manner. The tests in this project therefore:

* validate that data is retrieved or amended as appropriate to the controller and HTTP request method
* data is returned in the correct JSON format
* correct HTTP status codes are attached to the response header
* error messages are returned where required

## Built With
* Node.js - JavaScript runtime built on Chrome's V8 JavaScript engine
* Express.js - Web Framework for Node.js
* MongoDB - Document Database
* Mongoose - Object Modelling for Node and Mongo DB
* Mocha - JavaScript test framework
* Chai - Asserion based testing for Mocha
* Supertest - HTTP assertion testing agent

## Authors
* Nick Bansal

## Acknowledgements
* Northcoders team! for a fantastic journey and a wealth of knowledge gained!