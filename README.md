# Launch Instructions:

## Backend
* run 'pipenv install' inside of the root directory
* Create a .env file inside of the root directory, using the .env.example as a template
* In psql, create a user (with CREATEDB privileges) to match your .env file
* run 'pipenv run flask db upgrade'
* run 'pipenv run flask seed all'
* run 'pipenv run flask run'

## Frontend
* Start by navigating into the 'react-cap' directory
* run 'npm install' inside of the 'react-cap' directory
* run 'npm start'

## Troubleshooting
* Make sure to start the backend before the frontend, or you will get an error
* If you get an 'econnrefused' when trying to launch the application, run the command 'sudo service postgresql start' to get psql up and running
