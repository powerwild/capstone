from app.routes.user_routes import user_routes
from app.routes.gamer_routes import gamer_routes
from app.routes.trade_routes import trade_routes
from app.routes.review_routes import review_routes


def format_form_errors(errors):
    formatted_errors = []
    for field in errors:
        for error in errors[field]:
            if field == 'confirm_password':
                formatted_errors.append(f'Confirm Password {" ".join(str.split(error)[1:])}')
            elif field == 'email':
                formatted_errors.append(f'{field.title()} {error.lower()}')
            elif field == 'gamer_id':
                pass
            elif error == 'Invalid URL.':
                formatted_errors.append(error)
            elif field == 'image_url':
                formatted_errors.append(f'Image URL {" ".join(str.split(error)[1:])}')
            else:
                formatted_errors.append(f'{field.title()} {" ".join(str.split(error)[1:])}')
    return formatted_errors
