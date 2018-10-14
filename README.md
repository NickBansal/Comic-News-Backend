# NorthCoders NC_NEWS
This project showcases my understanding of MongoDB, through production, development and testing. The site will be deployed through Heroku using MLabs

## Getting started

### Useful Links

* NodeJS - https://nodejs.org/en/
* ExpressJS - https://expressjs.com/
* Mocha - https://mochajs.org/
* Mongoose - https://mongoosejs.com/


### Setting up the environment 

To get the project started I inputted the following into the nodeJS command terminal
```js
$ git init
```
This will set up the environment and create a `package.json` file.

I now installed the node packages saving them to the package.json dependencies
```js
$ npm install express body-parser mongoose --save
```
Also installing the node devDependencies with the following command
```js
$ npm install mocha chai supertest nodemon -D
```
The nodeJS environment is now ready for use

### Seeding the database
Fortunately the data was given inside the `seed` folder with `devData` and `testData`. Now write a seed file for the database for either test data or dev data depending on the environment that I'm running in.

Create a seed.js file within the seed folder and require in mongoose. 

I will need to seed the topics and users, followed by the articles and comments. 

* Each article should have a `belongs_to` property, referenced by a topic's `topic_slug`, and have a `created_by` property that references a user's mongo `_id`. 
* Each comment should also have `created_by` property that references a user's mongo `_id` and should also have a `belongs_to` property that references the specific article's mongo `_id`.

In order to use mongoose - remember to set up the connection

## Building and Testing

1.  Build your Express App
2.  Mount an API Router onto your app
3.  Define the routes described below
4.  Define controller functions for each of your routes (remember to use `.populate` for `created_by` and `belongs_to` fields that are mongo ids! This will be extremely useful when you are working on the front-end!)
5.  You will also need to return a `comment_count` property on all your endpoints that return articles. Attempt it on a single article first, then apply it to your all articles endpoint and finally your post new article. This is a great challenge to help consolidate your understanding of promises. (Note: do __not__ change the models to have a `comment_count` value in the database!)
6.  Use proper project configuration from the offset, being sure to treat development and test differently.
7.  Test each route as you go. Remember to test the happy and the unhappy paths! Make sure your error messages are helpful and your error status codes are chosen correctly. Remember to seed the test database using the seeding function and make the saved data available to use within your test suite.

## Hosting
### Heroku

In order to host the site you need to set up an account on heroku. This can be done from their website:

* https://dashboard.heroku.com/apps 

After signing up type the following into the command line 
```js
$ brew install heroku/brew/heroku
```
Once installed, you can use the heroku command from your command shell.

Log in using the email address and password you used when creating your Heroku account:
```js
$ heroku login
Enter your Heroku credentials.
Email: user@example.com
Password:
```
Now need to create a heroku server for the project
```js
$ heroku create
```
When the app is created, a git remote (called heroku) is also created and associated with your local git repository.

Now deploy your code:
```js
$ git push heroku master
```
and use the following to access the site
```js
$ heroku open
```

### MLabs

In order to transfer our database to the site you need to use a local database. This can be done with Mlabs. I firstly created an account from the following link:

* https://mlab.com/

A link to my heroku site can be found here:
*  https://agile-bastion-11504.herokuapp.com/

## Built With
* NodeJS
* MongoDB
* Express
* Mocha/Chai - Testing
* Heroku
* MLabs

## Authors
* Nick Bansal

## Acknowledgements
* Northcoders team!