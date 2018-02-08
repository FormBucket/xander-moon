# formbucket-client

This is the web app user interface for FormBucket.com.

# overview

The site is static. The code in this repo creates a public folder that can be used by any web server
deliver the app's HTML and JS code. The page HTML is generated dynamically with Reactjs.

The application by default will connect to https://api-dev.formbucket.com.

# setup

```sh
git clone https://github.com/FormBucket/xander-moon.git
```

# install dependencies

Dependencies are installed with yarn.

```sh
yarn
```

# build public folder

The build command runs all of the processes to create the public folder. First webpack is used to 
create static HTML file and then webpack creates the public/assets directory.

```sh
yarn build
```

# developing with the devServer.js

```sh
node devServer.js
```

