# feathers-version-checker
feathers-version-checker is a feathers based custom hooks function that allows you to check if your app is in updated version by passing the current app version to the hooks.

<h4> Installation </h4>

```$ npm install git+https://github.com/oizpans/feathers-version-checker.git```

<h4> Server Implementation </h4>

In your app.hooks.js or users.hooks.js or any hooks you want, you can use it this way:

```
const {paramsFromClient } = require('feathers-hooks-common');
const { Server } = require('feathers-version-checker');

module.exports = {
  before: {
    all: [
      paramsFromClient('currentAppVersion'),
      Server('1.2.3') // REQUIRED MINIMUM APP VERSION
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
 };
 ```

<h4> Client Implementation </h4>

```
const { Client } = require('feathers-version-checker');

app.hooks({
  before:{
    all:[
      Client('1.5.0') // CURRENT APP VERSION
    ]
  }
});
```

<h4> Adding it in a specific service in client </h4>

```
const { Client } = require('feathers-version-checker');

app.service('users').hooks({
  before: {
    all: [
      Client('1.5.0')
    ]
  }
});
```
