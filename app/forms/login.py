from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired, Email, Length, ValidationError, Optional


def check_has_name_or_email(form, field):
    if not field.data:
        if not form.data['email']:
            raise ValidationError('Username or Email is required.')


class LoginForm(FlaskForm):
    username = StringField('Username', validators=[check_has_name_or_email])
    email = StringField('Email', Optional()])
    password = PasswordField('Password', validators=[InputRequired(), Length(min=6, message='Password must be at least 6 characters.')])
