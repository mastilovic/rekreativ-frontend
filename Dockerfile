FROM --platform=$BUILDPLATFORM node:16.17.0 as builder

RUN mkdir /project
WORKDIR /project

RUN npm install -g @angular/cli@14.2.13

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
CMD ["ng", "serve", "--host", "0.0.0.0"]
