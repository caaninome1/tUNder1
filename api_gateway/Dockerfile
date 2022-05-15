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

EXPOSE 4000
ENV MQHOST=172.17.0.4
# Exports
CMD [ "node", "src/index.js" ]