docker build -t tunder_images_api .

docker run -p 5000:5000 --name tunder_images_api tunder_images_api