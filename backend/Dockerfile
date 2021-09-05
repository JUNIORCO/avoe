# Stage 0 - Build Frontend Assets
FROM node:12.16.3-alpine as build

WORKDIR /app/backend/
COPY package*.json .
RUN npm install --only=production
COPY . ./

CMD [ "npm", "start" ]
