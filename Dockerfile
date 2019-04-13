FROM node

WORKDIR /abb

COPY ./package.json .
COPY ./packages/server/package.json ./packages/server/
COPY ./packages/common/package.json ./packages/common/

RUN npm i -g yarn 
RUN yarn install --production


COPY ./packages/server/dist ./packages/server/dist/
COPY ./packages/common/dist ./packages/common/dist/
COPY ./ormconfig.json .

WORKDIR /packages/server

RUN ls

ENV NODE_ENV production

EXPOSE 4000

CMD ["node", "dist/index.js"]
