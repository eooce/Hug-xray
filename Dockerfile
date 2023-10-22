FROM node:slim

WORKDIR /app

COPY . .

EXPOSE 7860

RUN apt update -y &&\
    chmod +x index.js start.sh swith web &&\
    npm install

CMD ["node", "index.js"]