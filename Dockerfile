FROM node:20-alpine as builder
WORKDIR /usr/src/app

ARG VITE_API_URL
ARG VITE_GEOAPIFY_KEY
ARG VITE_CLOUDINARY_CLOUD_NAME
ARG VITE_CLOUDINARY_UPLOAD_PRESET

ENV VITE_API_URL $VITE_API_URL
ENV VITE_GEOAPIFY_KEY $VITE_GEOAPIFY_KEY
ENV VITE_CLOUDINARY_CLOUD_NAME $VITE_CLOUDINARY_CLOUD_NAME
ENV VITE_CLOUDINARY_UPLOAD_PRESET $VITE_CLOUDINARY_UPLOAD_PRESET

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn run build

FROM node:20-alpine as prod
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist /usr/src/app/dist
EXPOSE 8080

COPY package.json .
COPY vite.config.js .

RUN yarn add vite

EXPOSE 8080

CMD ["yarn", "run", "preview"]