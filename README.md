# Next.js + SST + TRPC + ElectroDb

## Things this includes

- NextJs app deployed with SST 2 via open-next
- TRPC Setup with react query ( client side, server side, server hydrating )
- Auth setup with SST auth and google provider
- Daisy Ui for the UI library
- ElectroDb for the wrapper to interface with dynamo

## Setup

### 1. Install your dependancies

    pnpm install

### 2. Initialise and start your SST dev environment

    pnpm sst dev

- This will use the auth credentials in your `~/.aws/credentials` file to deploy your environment.
- This will also log out your `AuthCallbackUrl` which will be needed to configure google auth

### 3. Configuring Google Auth

Follow the guide provided at this [link](`https://sst.dev/examples/how-to-add-google-login-to-your-sst-apps.html`).

- Skip all the actual SST setup stuff, just do the google side things
- When you get up to the client id step, copy it and replace `GOOGLE_CLIENT_ID` in `.env`
- When you get up to the update google redirect URI step add the url copied in the previous step plus /callback. `AuthCallbackUrl/callback`

### 4. Run your NextJs project

    pnpm run dev

## Deployment

This app can be deployed to production using the following command:

    pnpm run deploy:prod

## API and Docs

This repo uses TRPC for the api. You can define new endpoints by adding to the TRPC router ( sample user endpoints are provided in `src/services/controllers/userController.ts` and are registered in `src/services/controllers/base/router.ts` )

These endpoints are hosted as part of the Next.js deployment and run on the BE provided by the Next.js framework. Any resources that are needed by the API should be bind'd to the `NextJsSite` in the stacks

### API Docs

You can view your API docs on `localhost:3000/api/docs`


### IMPROVEMENTS 

- Bump versions of next, trpc, react query and SST 