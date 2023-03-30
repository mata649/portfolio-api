FROM node:18

WORKDIR /opt/application

COPY package*.json ./

RUN npm install
COPY tsconfig.build.json .
COPY tsconfig.json .
COPY src src

RUN npm run build

EXPOSE 5000

CMD [ "npm", "run", "start" ]

