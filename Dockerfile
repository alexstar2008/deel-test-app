FROM node:16.15-alpine

LABEL maintainer="alexey.starovoytenko@gmail.com"

RUN mkdir /deel
WORKDIR /deel

COPY ./package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start-dev"]
