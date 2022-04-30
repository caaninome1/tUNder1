import base64
import os

from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, migrate


# create the Flask app
app = Flask(__name__)

# adding configuration for using a sqlite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://tUNder:2022@172.17.0.2/tUNder_images_db'
 
# Creating an SQLAlchemy instance
db = SQLAlchemy(app)
 
# Settings for migrations
migrate = Migrate(app, db)

dirname = os.path.dirname(__file__)
 
# Models
class Image(db.Model):
    # database table.
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, unique=False, nullable=False)
 

@app.route('/image', methods=['GET', 'DELETE', 'POST'])
def image():
    data = request.get_json()
    if request.method == 'GET':
        id = data['id']
        with open('image_storage/{0}.jpg'.format(id), 'rb') as img_file:
            b64_string = base64.b64encode(img_file.read())
        return b64_string
    elif request.method == 'DELETE':       
        id = data['id']
        data = Image.query.get(id)
        db.session.delete(data)
        db.session.commit()
        os.remove('image_storage/{0}.jpg'.format(id)) # temporarily in local
        print('image with id \'{0}\' has been deleted'.format(id))
        return {'Id':id, 'Result':'DELETED'}
    elif request.method == 'POST':
        b64 = data['b64']
        user_id = data['user_id']
        image = Image(user_id=user_id) # id is created automatically, it will be the name of the image file
        db.session.add(image)
        db.session.commit()
        image_file = open(os.path.join(dirname, 'image_storage/{0}.jpg'.format(image.id)), 'wb') # use backslash if you are in Windows
        image_file.write(base64.b64decode((b64)))
        image_file.close()
        return {'Id':image.id, 'Result':'POSTED'}


@app.route('/images', methods=['GET'])
def images():
    data = request.get_json()
    user_id = data['user_id']
    # ids = ['dog', 'tree', 'bridge'] # now images will be named by their id (int)
    images = db.session.query(Image).filter(Image.user_id == user_id)
    b64_string_dict = {}
    for img in images:
        with open('image_storage/{0}.jpg'.format(img.id), 'rb') as img_file:
            b64_string_dict[img.id] = base64.b64encode(img_file.read()).decode()
    return b64_string_dict

if __name__ == '__main__':
    # run app in debug mode on port 5000
    app.run(debug=True, host='0.0.0.0', port=5000)