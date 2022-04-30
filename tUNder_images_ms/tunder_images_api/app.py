import base64
import os

from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, migrate
from google.cloud import storage

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = 'service-account-file.json'

# create the Flask app
app = Flask(__name__)

# adding configuration for using a sqlite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://tUNder:2022@172.17.0.2/tUNder_images_db'
 
# Creating an SQLAlchemy instance
db = SQLAlchemy(app)
 
# Settings for migrations
migrate = Migrate(app, db)

#dirname = os.path.dirname(__file__)
 
# Models
class Image(db.Model):
    # database table.
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, unique=False, nullable=False)
    mime_type = db.Column(db.String(40), unique=False, nullable=True)
    extension = db.Column(db.String(10), unique=False, nullable=True)

@app.route('/image', methods=['GET', 'DELETE', 'POST'])
def image():
    data = request.get_json()
    if request.method == 'GET':
        id = data['id']
        #with open('image_storage/{0}.jpg'.format(id), 'rb') as img_file:
        #    b64_string = base64.b64encode(img_file.read())
        images = db.session.query(Image).filter(Image.id == id)
        img = images[0]
        img_dict = { 
                        'id':img.id,
                        'b64':base64.b64encode(download_blob_into_memory(id)).decode(),
                        'mime_type':img.mime_type,
                        'extension':img.extension
                    }
        return img_dict
    elif request.method == 'DELETE':       
        id = data['id']
        data = Image.query.get(id)
        db.session.delete(data)
        db.session.commit()
        #os.remove('image_storage/{0}.jpg'.format(id)) # temporarily in local
        delete_blob(id)
        print('image with id \'{0}\' has been deleted'.format(id))
        return {'Id':id, 'Result':'DELETED'}
    elif request.method == 'POST':
        b64 = data['b64']
        user_id = data['user_id']
        mime_type = data['mime_type']
        extension = data['extension']
        image = Image(user_id=user_id, mime_type=mime_type, extension=extension) # id is created automatically, it will be the name of the image file
        db.session.add(image)
        db.session.commit()
        #image_file = open(os.path.join(dirname, 'image_storage/{0}.jpg'.format(image.id)), 'wb') # use backslash if you are in Windows
        #image_file.write(base64.b64decode((b64)))
        #image_file.close()
        upload_blob_from_memory(base64.b64decode((b64)), str(image.id), mime_type)
        return {'Id':image.id, 'Result':'POSTED'}


@app.route('/images', methods=['GET'])
def images():
    data = request.get_json()
    user_id = data['user_id']
    # ids = ['dog', 'tree', 'bridge'] # now images will be named by their id (int)
    images = db.session.query(Image).filter(Image.user_id == user_id)
    b64_string_dict = {}
    for img in images:
        #with open('image_storage/{0}.jpg'.format(img.id), 'rb') as img_file:
        #    b64_string_dict[img.id] = base64.b64encode(img_file.read()).decode()
        b64_string_dict[img.id] = { 
                                    'b64':base64.b64encode(download_blob_into_memory(str(img.id))).decode(),
                                    'mime_type':img.mime_type,
                                    'extension':img.extension
                                  }
    return b64_string_dict


def upload_blob_from_memory(contents, destination_blob_name, content_type):
    """Uploads a file to the bucket."""

    # The ID of your GCS bucket
    bucket_name = 'tunder_images_bucket'

    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)

    blob.upload_from_string(data=contents, content_type=content_type)

    print('{} with contents {} uploaded to {}.'.format(destination_blob_name, contents, bucket_name))

def download_blob_into_memory(blob_name):
    """Downloads a blob into memory."""

    # The ID of your GCS bucket
    bucket_name = 'tunder_images_bucket'

    storage_client = storage.Client()

    bucket = storage_client.bucket(bucket_name)

    # Construct a client side representation of a blob.
    blob = bucket.blob(blob_name)
    contents = blob.download_as_bytes()

    print('Downloaded storage object {} from bucket {} as the following string: {}.'.format(blob_name, bucket_name, contents))

    return contents

def delete_blob(blob_name):
    """Deletes a blob from the bucket."""

    # The ID of your GCS bucket
    bucket_name = 'tunder_images_bucket'

    storage_client = storage.Client()

    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(blob_name)
    blob.delete()

    print("Blob {} deleted.".format(blob_name))

if __name__ == '__main__':
    # run app in debug mode on port 5000
    app.run(debug=True, host='0.0.0.0', port=5000)
