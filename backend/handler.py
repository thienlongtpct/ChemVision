from app import APP  # Import your Flask app
from awslambdaric.lambda_handler import lambda_handler


# This tells Lambda to use your Flask app as the HTTP handler
def handler(event, context):
    return lambda_handler(event, context, APP)
