ARG NODE_VERSION="node:19.5.0"
FROM ${NODE_VERSION}

COPY  ./src /var/www/src
COPY ./package.json /var/www/
COPY ./types /var/www/types
COPY .fatherrc.ts /var/www/
# COPY tsconfig.json /var/www/
# COPY vitest.config.ts /var/www/


# 使用http代理
ENV HTTP_PROXY=http://192.168.1.9:7890
ENV HTTPS_PROXY=http://192.168.1.9:7890

# add bun
RUN curl -fsSL https://bun.sh/install | bash


WORKDIR /var/www


RUN ~/.bun/bin/bun install && ~/.bun/bin/bun run build

ENV HTTP_PROXY=
ENV HTTPS_PROXY=


