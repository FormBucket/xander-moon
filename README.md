# formbucket-ui

This is the web app user interface for FormBucket.com.

# overview

The site is a single page app. The code in this repo creates a public folder that can be used by any web server
to deliver the app's static code. The pages are generated dynamically by the browser with Reactjs with database
delivered by the application's API. This project does not include the API server code.

The application by default will connect to https://api-dev.formbucket.com.

# setup

```sh
git clone https://github.com/FormBucket/formbucket-ui.git
```

# install dependencies

Dependencies are installed with yarn.

```sh
yarn
```

# developing with the devServer.js

```sh
yarn start
```

# build files

```sh
yarn build
```
