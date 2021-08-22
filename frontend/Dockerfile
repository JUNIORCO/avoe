# Stage 0 - Build Frontend Assets
FROM node:12.16.3-alpine as build

WORKDIR /app/frontend/
COPY package*.json /app/frontend/
RUN npm install
COPY . /app/frontend/
RUN npm run build

# Stage 1 - Serve Frontend Assets
FROM fholzer/nginx-brotli:v1.12.2

WORKDIR /etc/nginx
ADD nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/frontend/build /usr/share/nginx/html
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
