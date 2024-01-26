COOKY TESTING

## Login
    •   Logging in with correct credentials
        o   Expected
            -   Upon logging in with correct credentials, page should redirect to recipe list
        o   Actual
            -   Logging in with correct credentials redirects the page to the recipe list
        o   Pass
    •   Logging in with incorrect credentials
        o   Expected
            -   Upon logging in with incorrect credentials, there should be a prompt of "Invalid Credentials"
        o   Actual
            -   Logging in with incorrect credentials prompts the users with "Invalid Credentials" error
        o   Pass
    •   Clicking SIGN UP NOW
        o   Expected
            -   Upon clicking the SIGN UP NOW, redirects the users to the register page
        o   Actual
            -   Clicking SIGN UP NOW redirects the users to the register page
        o   Pass

## Register
    •   Submitting while at least one field is empty
        o   Expected
            -   Sign Up button should not be clickable
        o   Actual
            -   Sign Up button is not clickable
        o   Pass
    •   Input invalid email
        o   Expected
            -   Entering invalid email should prompt the user with "Invalid Email"
        o   Actual
            -   Entering invalid email prompts the user with "Invalid Email"
        o   Pass
    •   Input password with less than 8 characters
        o   Expected
            -   Entering password with less than 8 charactes should prompt the user with "Password must contain at least 8 characters. Only accepts _ and . special characters!"
        o   Actual
            -   Entering password with less than 8 charactes prompts the user with "Password must contain at least 8 characters. Only accepts _ and . special characters!"
        o   Pass
    •   Input password with special charactes apart from . and _
        o   Expected
            -   Entering password with invalid charactes should prompt the user with "Password must contain at least 8 characters. Only accepts _ and . special characters!"
        o   Actual
            -   Entering password with invalid characters prompts the user with "Password must contain at least 8 characters. Only accepts _ and . special characters!"
        o   Pass
    •   Input unmatched passwords
        o   Expected
            -   Entering unmatched password should prompt the user with "Password does not match!"
        o   Actual
            -   Entering unmatched password prompts the user with "Password does not match!"
        o   Pass
    •   Submitting form with valid inputs
        o   Expected
            -   Submitting form should redirect the user to the login page
        o   Actual
            -   Submitting form redirects the user to the login page
        o   Pass

## Recipe List
    •   Viewing as a non admin (User management button)
        o   Expected
            -   User management button should not be visible
        o   Actual
            -   User management button is not visible
        o   Pass
    •   Viewing as a non admin (All recipe tab)
        o   Expected
            -   All recipe tab should not be visible
        o   Actual
            -   All recipe tab is not visible
        o   Pass
    •   Clicking new recipe
        o   Expected
            -   Clickig the button should redirect the users to the create recipe page
        o   Actual
            -   Clickig the button should redirect the users to the create recipe page
        o   Pass

## Recipe details
    •   Viewing a recipe as a non admin (own creation)
        o   Expected
            -   Edit and delete button should be visible
        o   Actual
            -   Edit and delete button are visible
        o   Pass
    •   Viewing a recipe as a non admin (other's creation)
        o   Expected
            -   Edit and delete button should not be visible
        o   Actual
            -   Edit and delete button are not visible
        o   Pass
    •   Viewing recipe as an admin
        o   Expected
            -   Edit and delete button should be visible
        o   Actual
            -   Edit and delete button are visible
        o   Pass

## Create recipe
    •   Submitting while at least one field is empty
        o   Expected
            -   Should require the user to input the empty fields
        o   Actual
            -   Requires the user to input the empty fields
        o   Pass
    •   Submitting with valid fields
        o   Expected
            -   Should redirect the user to the recipe list and show the created recipe on the list 
        o   Actual
            -   Redirects the user to the recipe list and shows the created recipe on the list 
        o   Pass

## Edit recipe
    •   Submitting while at least one field is empty
        o   Expected
            -   Should require the user to input the empty fields
        o   Actual
            -   Requires the user to input the empty fields
        o   Pass
    •   Submitting with valid fields
        o   Expected
            -   Should redirect the user to the recipe list and show the created recipe on the list 
        o   Actual
            -   Redirects the user to the recipe list and shows the created recipe on the list 
        o   Pass