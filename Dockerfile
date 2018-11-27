FROM node:9-alpine

ENV NODE_ENV=production
ENV HOST 0.0.0.0

RUN mkdir -p /app
COPY . /app
WORKDIR /app
# Expose the app port
EXPOSE 3000
RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && npm install \
    && apk del build-dependencies \
    && npm run build
CMD ["npm", "start"]