# pull official base image
FROM node:12-alpine

ENV COMPOSE_HTTP_TIMEOUT=50000

# set working directory
RUN mkdir -p /usr/app/
WORKDIR /usr/app
# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile

# add `/app/node_modules/.bin` to $PATH
ENV PATH /usr/app/node_modules/.bin:$PATH

COPY . ./
RUN yarn build
RUN chmod +x ./deploy.sh

ENV PORT 3000
EXPOSE 3000

# start app
CMD ["yarn", "start"]