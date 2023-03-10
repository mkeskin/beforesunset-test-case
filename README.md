# Getting Started

This app was created with [Next.js 13](https://nextjs.org/blog/next-13), used the new app directory but [Turbo](https://turbo.build) doesn't work for the development environment as it doesn't support Sass files.

[Zustand](https://github.com/pmndrs/zustand) is used for data state management. The reason why this is preferred is to separate the data layer. Store files are in the `./src/store` directory. On the other hand, [wretch](https://github.com/elbywan/wretch) is used to fetch data as micro-based service via API endpoints and handle error scenarios.

**NOTE:** _The html interface doesn't support the responsive design._

## Developing

After the node packages are installed, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

Test processes are written only for `./src/components`. Run to see:

```bash
npm run test
# or
yarn test
```

## Building

To create a production version of the app:

```bash
npm run build
# or
yarn build
```

## Dockerize

Run the app for development environment:

```bash
docker compose -f docker/development/docker-compose.yml build
docker compose -f docker/development/docker-compose.yml up -d
```

Otherwise, run the app for production environment:

```bash
docker compose -f docker/production/docker-compose.yml build
docker compose -f docker/production/docker-compose.yml up -d
```

## Deploy on Vercel

You can check out the app on [mkeskin-beforesunset.vercel.app](https://mkeskin-beforesunset.vercel.app) for preview.
