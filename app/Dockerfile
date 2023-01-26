FROM node

WORKDIR /usr/src/app

RUN corepack enable

COPY ./next/package.json .
COPY ./next/pnpm-lock.yaml .

RUN pnpm install

COPY ./next .

RUN pnpm next build .

EXPOSE 3000
CMD ["pnpm", "next", "start"]
