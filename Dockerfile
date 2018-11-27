FROM node:8.9.4-slim
MAINTAINER Tony <tony@simbo.com.tw>

ENV NODE_ENV=production
ENV HOST 0.0.0.0

RUN mkdir -p /app
COPY . /app
WORKDIR /app
# Expose the app port
EXPOSE 3000

RUN npm install
RUN npm install -g cross-env
RUN npm run build
CMD ["npm", "start"]