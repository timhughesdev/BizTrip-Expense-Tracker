# Dockerfile for Django backend
FROM python:3.11-slim

ENV PYTHONUNBUFFERED 1

WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . /app/

# Expose port and start server
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
