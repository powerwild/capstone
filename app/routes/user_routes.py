from flask import Blueprint, render_template
from flask_login import current_user, login_user. logout_user
from app import db

user_routes = Blueprint('users', __name__)


@user_routes.route('/auth')
def check_user():
    if current_user.is_authenticated:
        return current_user.format_dict()
    return {'errors': ['Must be logged in.']}


@auth_routes.route('/login', methods=['POST'])
def login():
    form = LoginForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.filter(User.username == form.data['username']).first()
        login_user(user)
        return user.format_dict()
    return {'errors': form.errors}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    form = SignupForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.format_dict()
    return {'errors': form.errors}


@auth_routes.route('/logout')
def logout():
    logout_user()
    return {'message': 'User logged out'}
