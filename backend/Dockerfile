FROM node:14.2-alpine
RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY --chown=node:node package*.json ./
USER node
RUN npm ci --only=production
RUN npm cache clean --force --loglevel=error
COPY --chown=node:node . .
HEALTHCHECK --timeout=3s --start-period=10s CMD node healthcheck.js
EXPOSE 3080
CMD [ "node", "server.js" ]
