# Contact Proxy

This worker gives the contact form a same-origin endpoint so the frontend no longer calls the remote mailer directly from the browser.

## Deploy

1. Install Wrangler: `npm install -g wrangler`
2. Authenticate: `wrangler login`
3. Deploy from this folder: `cd cloudflare && wrangler deploy`
4. Add a route for the production domain: `peterstroessler.com/api/contact`

## Required Worker Settings

- `MAILER_URL` should point at the upstream SwiftMailer endpoint.
- The route must be attached to the same zone that serves `peterstroessler.com`.

## Frontend Behavior

- On `peterstroessler.com` and `www.peterstroessler.com`, the form posts to `/api/contact`.
- In local development or file preview, the form keeps using the configured remote endpoint from the HTML attribute.