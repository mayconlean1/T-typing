FROM node:alpine

WORKDIR /usr/app

# COPY package*.json ./

RUN npm install -g nodemon
# RUN npm install

# COPY . .

EXPOSE 8080

# CMD só usa pra fazer build manual
# CMD ["npm" , "run", "dev-server"]