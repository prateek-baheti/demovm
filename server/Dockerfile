#stage 1: Build the Node.js server
FROM node:16

WORKDIR /usr/src/app/server

COPY package.json ./

COPY package-lock.json ./

# Clean npm cache
RUN npm cache clean --force

RUN npm install

COPY . .

EXPOSE 5001

ENV CONNECTION_STRING=mongodb://mongo:27017/rms

CMD ["npm", "start"]

