FROM node:16.15.0


# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080
ENV MQHOST 34.95.17.212
ENV MQPORT 5672
ENV MQUSER tunder
ENV MQPASS tunder1234
ENV MQQUEUE tunder_images
ENV PORT 8080
# Exports
CMD [ "node", "src/index.js" ]