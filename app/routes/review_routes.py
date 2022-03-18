from flask import Blueprint, render_template, request
from flask_login import current_user, login_required
from app import db
from app.routes.user_routes import format_form_errors
from app.models import Review
from app.forms import ReviewForm

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/', methods=['GET'])
@login_required
def get_reviews():
    reviews = Review.query.all()
    return {'reviews': [review.format_dict() for review in reviews]}


@review_routes.route('/', methods=['POST'])
@login_required
def create_review():
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review(
            user_id=current_user.id,
            gamer_id=form.data['gamer_id'],
            review=form.data['review']
        )
        db.session.add(review)
        db.session.commit()
        return review.format_dict()
    if form.errors:
        return {'errors': format_form_errors(form.errors)}


@review_routes.route('/<int:review_id>', methods=['PUT'])
@login_required
def update_review(review_id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review.query.get(review_id)
        review.review = form.data['review']
        db.session.commit()
        return review.format_dict()
    if form.errors:
        return {'errors': format_form_errors(form.errors)}


@review_routes.route('/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):
    review = Review.query.get(review_id)
    db.session.delete(review)
    db.session.commit()
    return {'message': 'Review Deleted'}
