from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired, Email, Length




class LoginForm(FlaskForm):
    credential = StringField('Username', validators=[InputRequired(), Length(min=3, message='Credential must be at least 3 characters.')])
    password = PasswordField('Password', validators=[InputRequired(), Length(min=6, message='Password must be at least 6 characters.')])
