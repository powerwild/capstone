from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import DataRequired, Length


class ReviewForm(FlaskForm):
    gamer_id = IntegerField('Gamer', validators=[DataRequired()])
    review = TextAreaField('Review', validators=[DataRequired(), Length(min=5, max=255, message='The field must be between 5 and 255 characters.')])
