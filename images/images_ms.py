
from flask import Flask, request
import base64

# create the Flask app
app = Flask(__name__)

@app.route('/image', methods=['GET', 'DELETE', 'POST'])
def image():
    data = request.get_json()
    if request.method == 'GET':
        id = data['id']
        with open('image_storage\{0}.jpg'.format(id), 'rb') as img_file:
            b64_string = base64.b64encode(img_file.read())
        return b64_string
    elif request.method == 'DELETE':       
        id = data['id']
        # call images_data_db to remove image data with id 'id'
        # call image storage and delete image file with id 'id'
        print('image with id \'{0}\' has been deleted'.format(id))
        return {'Id':id, 'Result':'DELETED'}
    elif request.method == 'POST':
        b64 = data['b64']
        id = data['id'] # generar en backend con alguna función ...
        new_image = open('image_storage\{0}.jpg'.format(id), 'wb')
        new_image.write(base64.b64decode((b64)))
        new_image.close()
        return {'Id':id, 'Result':'POSTED'}


@app.route('/images', methods=['GET'])
def images():
    data = request.get_json()
    user_id = data['user_id']
    # call images_data_db to get ids of images belonging to user with user id 'user_id'
    ids = ['dog', 'tree', 'bridge']
    b64_string_dict = {}
    for id in ids:
        with open('image_storage\{0}.jpg'.format(id), 'rb') as img_file:
            b64_string_dict[id] = base64.b64encode(img_file.read()).decode()
    return b64_string_dict

if __name__ == '__main__':
    # run app in debug mode on port 5000
    app.run(debug=True, port=5000)