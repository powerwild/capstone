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


# Technologies
  * React/Redux
  * Python/Flask
  * PostgreSQL
  * SQLAlchemy
  * AWS

# Features

## Games - create and store a reference to a physical game owned by the user.

![Screenshot (13)](https://user-images.githubusercontent.com/92146309/163048927-c7579562-9e8b-4389-8b39-6054af4cee6d.png)


## Reviews - users can leave/edit a review for another user(gamer).

![Screenshot (15)](https://user-images.githubusercontent.com/92146309/163048966-7bc4125c-7622-4bed-95fc-e113628f0311.png)


## Trades - users(who have created a game reference) can request trades from other users(who have also created a game reference).

![Screenshot (14)](https://user-images.githubusercontent.com/92146309/163049037-904cef9b-5bf4-4989-bc88-2a98ec250b92.png)


## Filter - users can filter by console or genre.

![filter](https://user-images.githubusercontent.com/92146309/163049073-95e8c5b7-cb0e-4a29-8a6d-3e76874a97e7.png)

