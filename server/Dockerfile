# Build application to compile TypeScript if needed.
FROM node:14.8.0-alpine as build

RUN apk update && \
    apk upgrade && \
    apk add git

RUN mkdir /app
WORKDIR /app

ADD ./package.json ./.npmrc* ./
RUN npm install

ADD . .
RUN npx wolkenkit build


# Install production dependencies.
FROM node:14.8.0-alpine as dependencies

RUN mkdir /app
WORKDIR /app

ADD ./package.json ./.npmrc* ./
RUN npm install --production


# Bundle the built application with the production dependencies.
FROM node:14.8.0-alpine

RUN mkdir /app
WORKDIR /app

ADD ./package.json .

COPY --from=build /app/build /app/build
COPY --from=dependencies /app/node_modules /app/node_modules