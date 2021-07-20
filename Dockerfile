FROM node:14
WORKDIR /app
EXPOSE 3000

COPY package*.json ./

RUN npm install

COPY . .

RUN mkdir logs

CMD ["npm", "start"]