# Dockerfile to run a Flask app
FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    FLASK_ENV=production \
    PORT=5000

WORKDIR /app

# Install build deps if needed for some wheels
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app

EXPOSE 5000

# If gunicorn is available use it, otherwise fallback to flask run.
# Assumes Flask app instance is named `app` in app.py (adjust "app:app" if different).
CMD ["sh", "-c", "python -c \"import importlib,sys\ntry:\n importlib.import_module('gunicorn'); sys.exit(0)\nexcept Exception:\n sys.exit(1)\" >/dev/null 2>&1 && exec gunicorn --bind 0.0.0.0:${PORT} app:app --workers 4 || exec flask run --host=0.0.0.0 --port=${PORT}"]