FROM ubuntu:20.04

# Install the necessary packages
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    libpq-dev

# Copy the application code into the Docker image
COPY . /app

# Install the application dependencies
RUN pip install -r /app/requirements.txt

# Expose port 8000 for the Django application
EXPOSE 8000

# Run the Django application
CMD ["python", "/app/manage.py", "runserver", "0.0.0.0:8000"]