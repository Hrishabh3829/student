FROM node:21-alpine

WORKDIR /app


COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .



EXPOSE 4000

RUN npm start
