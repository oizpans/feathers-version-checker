# feathers-version-checker
feathers-version-checker is a feathers based custom hooks function that allows you to check if your app is in current version by passing current app version to the server.

<h4> Installation </h4>

`npm install git+https://github.com/oizpans/feathers-version-checker.git`

<h4> Server Implementation </h4>

In your app.hooks.js you can use it this way:

```
const pfc = require('feathers-hooks-common');
const { latestVersionResponse } = require('feathers-version-checker');
const { paramsFromClient } = pfc;

module.exports = {
  before: {
    all: [
      paramsFromClient('currentAppVersion'),
      latestVersionResponse('1.2.3')
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
const { checkForLatestVersion } = require('feathers-version-checker');

app.hooks({
  before:{
    all:[
      checkForLatestVersion('1.5.0')
    ]
  }
});
```
