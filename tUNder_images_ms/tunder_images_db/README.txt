docker build -t tunder_images_db .

docker run -d -t -i -p 3306:3306 --name tunder_images_db tunder_images_db

docker run --name tunder_images_db_client -d --link tunder_images_db:db -p 8081:80 phpmyadmin
