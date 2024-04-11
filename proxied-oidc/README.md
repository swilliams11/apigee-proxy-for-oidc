# Proxied OIDC provider

This repo contains an example of an API proxy that proxies an Open ID Connect Identity Provider, Auth0.

## Motivation

Why would a customer want to do this?

[Open ID Connect](https://openid.net/connect/) describes a way for third-party applications to obtain an OAuth token that authenticates both the application as well as the user operating the application. With OAuth, the model is: the app will first login, and obtain the access token. Then, the app will use the access token on subsequent requests for service. OIDC extends that in a couple ways: dynamic client registration, discovery, and the id_token response type. Typically OIDC servers will return a JWT for the access token, and another JWT for the ID token.

A customer might want to enable the OIDC login/authentication flow, but prevent the client app, maybe a web app, from obtaining full access to either the JWT access token or the JWT ID token.  If an Apigee proxy intercedes between the client application and the IdP, Apigee can mediate the OIDC response to deliver an opaque token that corresponds to the IDP-issued access token and ID token.


## How does it work?

OIDC is based on APIs. Apigee simply proxies the requests from the client app to the Identity Provider.

## Using this example

There are two parts here:
- [a bundle for the Apigee proxy](./bundle-oidc-okta-1) that sits in front of Auth0. Deploy this into Apigee hybrid or X.
- [the web app](./oidc-demo-webapp) that invokes the API Proxy

To use this demonstration yourself, you will need to:

1. get an Auth0 account.  A free developer account is fine.
  - set up a custom Authorization server in Auth0
  - create an Auth0 Application.
    - Application Type: Web
    - redirect URL: https://YOUR_DOMAIN/oidc-okta-1/callback
      where YOUR_DOMAIN is the domain of your Apigee X or hybrid environment group.
    - "Client acting on behalf of a user." Check the box for: Authorization Code, Refresh Token
    - note the client\_id and client\_secret for this app.
  - associate one or more users to that app.  (This allows users to signin for that app)

2. modify the [idp.properties](./bundle-oidc-okta-1/apiproxy/resources/properties/idp.properties) file within the API proxy, to specify the four items from your Auth0 tenant:
  - domain
  - authzServer
  - clientId
  - clientSecret

3. Deploy the API proxy into your Apigee environment.

3. Configure Apigee:
   - Create (or re-use) a Developer
   - Create (or re-use) an API Product. Add in the API proxy to that product
   - Create (or re-use) a Developer App. Note the client\_id.


4. Build [the web app](./oidc-demo-webapp), and deploy it to a web server.
   Check the [README](./oidc-demo-webapp/README.md) for details.

5. Load the page into a browser. (Maybe use an incognito window)
   eg, Open browser tab to:
   http://localhost/html/oidc-demo-webapp/

   In the browser tab, you may want to open the browser developer tools and observe the network tab.

6. Start a trace session for the API Proxy

6. Run the web app. In the form, specify:
   - endpoint: https://YOUR_APIGEE_DOMAIN/oidc-okta-1/echo/get
   - clientid: CLIENT\_ID\_OF\_APIGEE\_APP

   Click the arrow button.

   You should see a login challenge. After completion, you should see
   a token appear in the web app. Click the arrow again and the
   call goes through to the echo service.


## Youtube screencast

[See here](https://youtu.be/SlpqmkB6XVA)

## Author

Dino Chiesa
goDino@google.com

###  Modified By
Sean Williams
williamssean@google.com
