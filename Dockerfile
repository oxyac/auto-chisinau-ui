FROM node:19-buster as build

WORKDIR /build

RUN mkdir -p /root/.ssh \
    && chmod 0700 /root/.ssh \
    && ssh-keyscan -t rsa github.com >> /root/.ssh/known_hosts \
    && git clone https://github.com/oxyac/auto-chisinau-ui.git . \
    && npm install && npm run build

FROM nginx:stable-alpine as production-stage
EXPOSE 8081
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /build/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
