FROM node:alpine

#Specify a working directory
WORKDIR /usr/src/app

#Copy the dependencies file
COPY package.json ./

#Install dependencies
RUN yarn 

#Copy remaining files
COPY . .

EXPOSE 3001

CMD [ "yarn", "start" ]

