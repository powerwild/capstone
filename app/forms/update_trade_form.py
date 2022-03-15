from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class UpdateTradeForm(FlaskForm):
    req_game_id = IntegerField('Requesters Game', validators=[DataRequired()])
