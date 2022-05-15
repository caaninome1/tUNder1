FROM python:3

ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/
ENV PORT 5000
ENV DATABASE_URL mysql://tUNder:2022@172.17.0.2/tUNder_images_db
ENV QUEUE_HOST 172.17.0.4
ENV QUEUE_NAME tunder_images

CMD ["sh", "-c", "flask db init && flask db migrate -m 'Initial migration' && flask db upgrade && python app.py"]
