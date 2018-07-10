# feathers-version-checker
- custom hook that allows you to check if your app is in updated version by passing the current app version to the hooks.


#### Installation
```ssh
$ npm install git+https://github.com/oizpans/feathers-version-checker.git
```

#### Server Implementation
- can be registered to any `before hooks` on server.

```js
const {paramsFromClient } = require('feathers-hooks-common');
const { Server } = require('feathers-version-checker');

module.exports = {
  before: {
    all: [
      paramsFromClient('currentAppVersion'),
      Server('1.2.3') // Required minimum App version
    ],
    find: [],
    ...
  }
 };
```

#### Client Implementation
- can be registered to any ` before hooks` on client.

```js
const { Client } = require('feathers-version-checker');

app.hooks({
  before:{
    all:[
      Client('1.5.0') // Current App version
    ]
    ...
  }
});
```

#### Adding it in a specific service in client

```js
const { Client } = require('feathers-version-checker');

app.service('users').hooks({
  before: {
    all: [
      Client('1.5.0')
    ]
  }
});
```
