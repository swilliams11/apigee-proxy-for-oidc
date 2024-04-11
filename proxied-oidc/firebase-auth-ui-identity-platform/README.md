## Firebase Auth UI Identity Platform

This is the example UI for Google Cloud Identity Platform.


### Prereqs
This assumes that you enabled the Cloud Idenity Platform in your GC Project and that you disabled [email enumeration](https://cloud.google.com/identity-platform/docs/admin/email-enumeration-protection#disable) in the Firebase console. 

If you don't disable email enumeration, then when an existing user attempts to sign-in it will prompt them to create a new account instead.  This is a [bug](https://github.com/firebase/firebaseui-web/issues/1040).

### Setup
1. Install the firebase CLI
```shell
npm install -g firebase-tools 
```


### Configure the App
1. login to firebase.
```shell
firebase login
```

2. initialize it.
```shell
firebase init
```

#### Interact with Local Emulator
3. When you start the emulator, by default it will interact with your live resources in Google Cloud. Therefore, you must start it with a project that starts with `demo-`.
```shell
firebase emulators:start --project demo-cloud-identity-platform
```

4. You can access the app by opening the following link in Chrome.
`http://localhost:5000/login-emulator.html`

5. Now open the Firebase Auth emulator and enter one or more test users.

`http://localhost:4000/auth`

6. On the `login-emulator.html` page, click the `Signin with Email and Password` button. 
A successful signin will redirect to the `index.html` page. 


#### Interact with live project resources
Follow these steps if you want to interact with Cloud Identity Platform in your GC Project.  

3. Update the `login.html` page to include your `apiKey` and `authDomain` (line 16 and 17).

4. When you start the emulator and specify your GC project ID.
```shell
firebase emulators:start --project YOUR_GCP_PROJECT_ID
```

5. You can access the app by opening the following link in Chrome.
`http://localhost:5000/login.html`


6. Create a user in Cloud Identity Platform. Then attempt to signin the user by clicking `Signin with Email and Password` on the `login.html` page.

### Helpful Resources

* [Firebase Hosting Emulator - Local Testing](https://firebase.google.com/docs/hosting/test-preview-deploy#test-locally)

