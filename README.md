# Setting up the functions

    > Build the functions
        * cd functions
        * npm install


    > Set the environment variables:
        * firebase functions:config:set site.rooturl="https://altusknowledge.firebaseapp.com"
        * firebase functions:config:set payu.key="gtKFFx"
        * firebase functions:config:set payu.salt="eCwWELxi"

# Setting up the front-end site

    > Build the angular project
        * cd front-end
        * npm install
        * ng build --prod

# Deploying to firebase

    > Login & Deploy
        * firebase login
        * firbase deploy