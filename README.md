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

Then, initialize the client:

```js
const client = new Client(apiKey)
```

### List logs

```js
const logs = await client.list();

// Or use promises 
client.list().then((logs) => {

})
```

### Get a single logs

```js
const log = await client.get(logId);

// Or use promises
client.get(logId).then((log) => {

})
```

### Get events for a log

```js
const events = await client.getEvents(logId);

// Or use promises
client.getEvents(logId).then((events) => {

})
```

### Resend an email from a log

```js
const result = await client.resend(logId);

if (result.success) {
    ...
}

// Or use promises
client.resend(logId).then((result) => {
    if (result.success) {
        ...
    }
})
```