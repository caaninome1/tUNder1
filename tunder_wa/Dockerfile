FROM node:16.15.0

RUN npm install -g http-server

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY package.json ./
COPY package-lock.json ./
COPY server.* ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 80
RUN npm run build
# Exports
CMD [ "http-server", "dist", "-P http://localhost:8080?", "" ]