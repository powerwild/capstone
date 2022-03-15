from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired


class NewTradeForm(FlaskForm):
    recipient_id = IntegerField('Recipient', validators=[DataRequired()])
    rec_game_id = IntegerField('Recipients Game', validators=[DataRequired()])
