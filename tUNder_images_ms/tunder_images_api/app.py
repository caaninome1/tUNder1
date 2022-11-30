import base64
import os
from threading import Thread

from flask import Flask, request, make_response, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, migrate
from google.cloud import storage
import pika
import json

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = 'service-account-file.json'

# create the Flask app
app = Flask(__name__)

# adding configuration for using a sqlite database
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")

# Creating an SQLAlchemy instance
db = SQLAlchemy(app)

# Settings for migrations
migrate = Migrate(app, db)

# Models


class Image(db.Model):
    # database table.
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, unique=False, nullable=False)
    mime_type = db.Column(db.String(40), unique=False, nullable=True)
    extension = db.Column(db.String(10), unique=False, nullable=True)

# Microservice Endpoints


@app.route('/image', methods=['GET', 'DELETE', 'POST'])
def image():
    if request.method == 'GET':
        id = request.args.get('id')
        images = db.session.query(Image).filter(Image.id == id)
        img = images[0]
        img_dict = {
            'id': img.id,
            'b64': base64.b64encode(download_blob_into_memory(id)).decode(),
            'mime_type': img.mime_type,
            'extension': img.extension
        }
        data = {'image': img_dict, 'result': 'FOUND',
                'code': 'SUCCESS', 'status': 200}
        return make_response(jsonify(data))
    elif request.method == 'DELETE':
        id = request.args.get('id')
        print(id)
        image = Image.query.get(id)
        db.session.delete(image)
        db.session.commit()
        delete_blob(id)
        data = {'id': image.id, 'result': 'DELETED',
                'code': 'SUCCESS', 'status': 200}
        return make_response(jsonify(data))

    elif request.method == 'POST':
        data = request.get_json()
        user_id = data['user_id']
        mime_type = data['mime_type']
        extension = data['extension']
        # id is created automatically, it will be the name of the image file
        image = Image(user_id=user_id, mime_type=mime_type,
                      extension=extension)
        db.session.add(image)
        db.session.commit()
        data = {'id': image.id, 'result': 'POSTED',
                'code': 'SUCCESS', 'status': 200}
        return make_response(jsonify(data))


@app.route('/images', methods=['GET'])
def images():
    user_id = request.args.get('user_id')
    images = db.session.query(Image).filter(Image.user_id == user_id)
    img_list = []
    for img in images:
        img_list.append({
            'id': img.id,
            'b64': base64.b64encode(download_blob_into_memory(str(img.id))).decode(),
            'mime_type': img.mime_type,
            'extension': img.extension
        })
    data = {'images': img_list, 'result': 'FOUND',
            'code': 'SUCCESS', 'status': 200}
    return make_response(jsonify(data))

# Google Cloud Storage Methods:


def upload_blob_from_memory(contents, destination_blob_name, content_type):
    """Uploads a file to the bucket."""

    # The ID of your GCS bucket
    bucket_name = 'tunder'

    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)

    blob.upload_from_string(data=contents, content_type=content_type)

    print('{} uploaded to {}.'.format(
        destination_blob_name, bucket_name))


def download_blob_into_memory(blob_name):
    """Downloads a blob into memory."""

    # The ID of your GCS bucket
    bucket_name = 'tunder'

    storage_client = storage.Client()

    bucket = storage_client.bucket(bucket_name)

    # Construct a client side representation of a blob.
    blob = bucket.blob(blob_name)
    contents = blob.download_as_bytes()

    print('Downloaded storage object {} from bucket {}.'.format(
        blob_name, bucket_name))

    return contents


def delete_blob(blob_name):
    """Deletes a blob from the bucket."""

    # The ID of your GCS bucket
    bucket_name = 'tunder'

    storage_client = storage.Client()

    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(blob_name)
    blob.delete()

    print("Blob {} deleted.".format(blob_name))


if __name__ == '__main__':
    queue_host = os.getenv("QUEUE_HOST")
    queue_name = os.getenv("QUEUE_NAME")
    queue_user = os.getenv("QUEUE_USER")
    queue_pass = os.getenv("QUEUE_PASS")
    queue_url = f'amqp://{queue_user}:{queue_pass}@{queue_host}:5672'
    print("Connecting to queue: {} in host {}".format(queue_name, queue_host))
    # Messages Queue
    connection = pika.BlockingConnection(
        pika.URLParameters(queue_url))
    channel = connection.channel()

    channel.queue_declare(queue=queue_name, durable=True)

    def callback(ch, method, properties, body):
        load_body = json.loads(body)
        print(" [x] Received %s, %s" % (load_body['id'], load_body['mime_type']))
        img=base64.b64decode(load_body['b64'])
        upload_blob_from_memory(img, str(load_body['id']), str(load_body['mime_type']))

    channel.basic_consume(queue=queue_name,
                          on_message_callback=callback, auto_ack=True)

    print('[*] Waiting for messages. To exit press CTRL+C')

    def run_thread():
        channel.start_consuming()

    thread = Thread(target=run_thread)
    thread.start()
    port = int(os.environ.get('PORT', 5000))
    # run app in debug mode on port 5000
    app.run(debug=True, host='0.0.0.0', port=port)
