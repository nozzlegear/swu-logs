# swu-logs

A small library for interacting with the SendWIthUs Logs API, complete with full TypeScript typings and async functions.

## Installation

```bash
npm install swu-logs --save
```

If you're using TypeScript, the compiler should automatically pick up the package's typings (assuming you're on version 1.9+).

## Usage

The library is exported with ES6's `export default` syntax. To import it into your script, do the following:

```js
//ES6-style import
import Client from "swu-logs";

//Node-style require
const Client = require("swu-logs").default;
```

### List logs

```js
const logs = await Client.list();

// Or use promises 
Client.list().then((logs) => {

})
```

### Get a single logs

```js
const log = await Client.get(logId);

// Or use promises
Client.get(logId).then((log) => {

})
```

### Get events for a log

```js
const events = await Client.getEvents(logId);

// Or use promises
Client.getEvents(logId).then((events) => {

})
```

### Resend an email from a log

```js
const result = await Client.resend(logId);

if (result.success) {
    ...
}

// Or use promises
Client.resend(logId).then((result) => {
    if (result.success) {
        ...
    }
})
```