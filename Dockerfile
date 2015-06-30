FROM ubuntu:vivid
MAINTAINER Ben Creasy <contact@bencreasy.com>

ENV DEBIAN_FRONTEND noninteractive
ENV NODE_ENV development

RUN apt-get update -y \
    && apt-get -qq -y update \
    && apt-get install -y nodejs vim curl \
    && ln -s /usr/bin/nodejs /usr/bin/node \
    && apt-get install -y npm mongodb mongodb-clients \
    && npm install -g nodemon react-tools browserify grunt-cli mocha istanbul \
    && apt-get install ruby -y && gem install sass \
    && mkdir -p /data/db/pathhero-stage \
    && mkdir /app

ADD . /app
WORKDIR /app
RUN npm install
ENV NODE_ENV production
VOLUME /data/db/pathhero-stage
CMD mongod --fork --dbpath /data/db/pathhero-stage \
           --logpath /var/log/mongod.log \
           && grunt deploy