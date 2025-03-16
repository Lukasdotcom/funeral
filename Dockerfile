FROM node:22-alpine
LABEL authors="lukas"

RUN mkdir /app
WORKDIR /app
COPY . /app
RUN npm ci --omit=dev
RUN touch /app/build

EXPOSE 3000

ENTRYPOINT ["npm", "run", "docker"]