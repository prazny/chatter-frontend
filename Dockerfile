FROM node:alpine

ENV NODE_ENV development

WORKDIR /frontend

COPY . .

RUN npm install
RUN npm install react-scripts

RUN npm run build

EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]