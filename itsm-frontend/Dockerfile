# frontend/Dockerfile
# Stage 1: build
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: serve with nginx
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
# remove default nginx config if you want a custom one (optional)
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
