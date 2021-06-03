FROM node:15
WORKDIR /app
COPY . .
RUN npm install
# RUN npm install --production
RUN npx knex migrate:latest
CMD npm run dev