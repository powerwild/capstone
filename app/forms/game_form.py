from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, URL, NumberRange

class GameForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    image_url = StringField('Image URL', validators=[DataRequired(), URL()])
    description = TextAreaField('Description', validators=[DataRequired()])
    genre = SelectField('Genre', choices=['Strategy', 'Sandbox', 'First Person Shooter', 'Multiplayer Online', 'Role-Playing', 'Simulation', 'Sports', 'Puzzle', 'Adventure', 'Survival', 'Platformer'])
    console = SelectField('Console', choices=['PlayStation 4','Playstation 3', 'Xbox 1', 'Xbox 360', 'Switch', 'Wii U', 'PC'])
    copies = IntegerField('Copies Owned', validators=[DataRequired(), NumberRange(min=1, message='Must own at least one copy.')])
