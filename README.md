# Getting started

## Starting the application
    •	On the terminal, run the command to start the JSON Server as a mockup server
        o	npx json-server --watch server/db.json --port 8000
        o   This will run the server with address: http://localhost:8000/
    •	After starting the JSON server, run the following command to start the app
        o	npm run start
        o   This will run the application with address: http://localhost:8000/
        o	This should also redirect to the login page of the application: http://localhost:8000/login

## The Server
    •   The JSON server has 2 endpoints/tables
        o   http://localhost:8000/users
                {
                    "userid": "21b8",
                    "name": "admin",
                    "email": "admin@gmail.com",
                    "password": "adminadmin",
                    "isAdmin": true,
                    "id": "21b8"
                }
        o   http://localhost:8000/recipes
                {
                    "id": "77eb",
                    "recipename": "Steamed Salmon",
                    "serving": "4",
                    "preparation": "00:30",
                    "ingredients": "Sample Ingredients",
                    "procedure": "Sample Procedure",
                    "image": {IMAGE Base64},
                    "author": "Darrius",
                    "authorid": "4099"
                }
    •   The JSON server also saves the image files by storing the file using base64 due to the availability of cloud storage
    

## User authentication
    •	User can log in using these default credentials
        o	Email: admin@gmail.com, Password: adminadmin, isAdmin: true
        o	Email: darrius@gmail.com, Password: darriusdarrius, isAdmin: false
        o	Email: alinsugay@gmail.com, Password: alinsugayalinsugay, isAdmin: false
    •	Users can also opt out to use these credentials and can register their own on the register page by clicking the SIGN UP NOW link below the login page



## Modules
    •   There are 2 modules that are available on the trial project
        o   Recipes Management
        o   Users Management

## Recipes Management
    •   The recipe management modules is the main module for the application
    •   The module consists of the following functions
        o   Creating a new recipe
        o   Viewing a lists of recipe
            o   List of own recipe
            o   List of other user's recipe
            o   List of all recipes (available only to the admin users)
        o   Viewing the details of the recipe
        o   Editing and deleting the recipe
            o   This function is available only if the logged users is viewing a recipe of his own creation, or if the logged user is an admin

## Users Management
    •   This module is only available to admin users. Accessing this module using non admin users will redirect the user to the recipe list instead.
    •   The module consists of the following functions
        o   Creating a new user
        o   Viewing a list of users
        o   Editing and deleting a of recipe
            o   A user can delete users if the user selected is not the logged user
    •   Creating and editing users have the capability to validate the input fields
        o Email
            o   Has a regex checking if an email is valid
        o Password
            o   Has a regex checking if the password has at least 8 characters
            o   Only accepts period (.) and underscore (_) as a special character
            o   Will require the user to re-enter the password to a separate field to check if both passwords matched


## Testing
    •   For the functional testing, you may reference the FunctionalityTest.md file