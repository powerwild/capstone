from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired, Email, Length, EqualTo

class SignupForm(FlaskForm):
    username = StringField('Username', validators=[InputRequired(), Length(min=3, message='Username must be at least 3 characters.')])
    email = StringField('Email', validators=[InputRequired(), Email(message='Must be a valid email.')])
    password = PasswordField('Password', validators=[InputRequired(), Length(min=6, message='Password must be at least 6 characters.')])
    confirm_password = PasswordField('Confirm Password', validators=[InputRequired(), Length(min=6, message='Password must be at least 6 characters.', EqualTo('password', message='Confirm Password must match password'))])
