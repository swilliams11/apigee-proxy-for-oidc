## Web app to interact with Google Identity Platform proxied OIDC

This webapp demonstrates how to use Google Identity Platform with Apigee.


### Building the dist folder
You can build this with the following steps. If you make changes to the 

1. Update the `login.js` with your Cloud Identity Platform API Key and Domain Name.

2. Execute the following command to install the required Node modules.
```shell
npm install
```

3. Execute the following command to create the `dist/js` folder, which will contain a file named `bundle.js`.
```shell
npm run build
```

4. After the `dist/js` folder is created, then you can run this locally by opening the HTML page in Chrome. 


### Deploy to Cloud Run
TODO
1. Create gcloud commands
2. Create shell script

