FROM node:16.0

WORKDIR /frontend

COPY ./package.json ./

RUN npm install
# RUN npm install pm2
COPY . .

EXPOSE 5009
CMD [ "npm", "run", "build" ]

CMD [ "npm", "run", "start" ]