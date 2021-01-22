FROM nginx

COPY nginx/nginx.conf /etc/nginx/nginx.conf

RUN chmod -R 777 /var/log/nginx /var/cache/nginx /var/run \
     && chgrp -R 0 /etc/nginx \
     && chmod -R g+rwX /etc/nginx
#     && rm /etc/nginx/conf.d/default.conf

ENV ROOT /src/app/

WORKDIR $ROOT/

# build & test
COPY build $ROOT/

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]