FROM node:16.5.0-alpine
WORKDIR /usr/src/week1
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm","start"]