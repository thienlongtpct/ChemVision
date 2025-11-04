import serverless_wsgi
from app import APP


def handler(event, context):
    return serverless_wsgi.handle_request(APP, event, context)
