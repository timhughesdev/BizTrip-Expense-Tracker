# Stage 1: Build the React app
FROM node:18 as build

WORKDIR /app

# Clean npm cache and install dependencies
COPY package.json package-lock.json* ./
RUN npm cache clean --force
RUN npm install

# Copy project files and build the app
COPY . .
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
