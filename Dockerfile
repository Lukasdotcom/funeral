FROM node:22-alpine
LABEL authors="lukas"

RUN mkdir /app
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run migrate
RUN npm run build

EXPOSE 3000

ENTRYPOINT ["npm", "run", "docker"]