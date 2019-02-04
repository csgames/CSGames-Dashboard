FROM node:8-alpine

# Create app directory
RUN mkdir -p /usr/src/webapp
WORKDIR /usr/src/webapp

ADD package.json /tmp/package.json
ADD .npmrc /tmp/.npmrc
RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules /usr/src/webapp

# Bundle app source
ADD . /usr/src/webapp
RUN npm run build:prod

EXPOSE 4200
CMD [ "npm", "run", "server" ]
