from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, URL

class GameForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    image_url = StringField('Image URL', validators=[DataRequired(), URL()])
    description = TextAreaField('Description', validators=[DataRequired()])
    genre = SelectField('Genre', choices=[])
    console = SelectField('Console', choices=[])
    copies = IntegerField('Copies Owned', validators=[DataRequired()])
