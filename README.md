# Print On Demand Application

## Frontend

React with Typescript.

Nextjs used for SSR and SSG.

Tailwind CSS.

P5.js used for t-shirt customization tool.

## Backend

Django with Django Rest Framework for APIs.

Postgresql database (any SQL database can be used).

## Deployment

Can deploy the front-end on Vercel to make use of their in-build features for Next JS projects.

To easily deploy the back-end on a DigitalOcean VPS, fill in the fields in the .env file and use Docker.

To deploy using Docker, navigate to the directory containing the Dockerfile then use the following commands:

### Build the docker image

docker build -t django-printondemand:v0 .

### Run the database migrations

docker run --env-file .env django-printondemand:v0 sh -c "python manage.py makemigrations && python manage.py migrate"

### Collect the static files

docker run --env-file .env django-printondemand:v0 sh -c "python manage.py collectstatic --noinput"

### Run the container

docker run -d --env-file .env -p 80:8000 django-printondemand:v0