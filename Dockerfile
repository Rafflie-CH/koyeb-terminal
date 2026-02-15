FROM node:20

RUN apt update && apt install -y python3 make g++

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm","start"]
