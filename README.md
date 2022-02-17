# Bot Link Generator
> Generate an invite link to your Discord bot directly on your code.

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

<br>

## Installation
```bash
# NPM
$ npm install dbotlinkgen

# Yarn
$ yarn add dbotlinkgen
```

<br>

## Usage
```js
// import { BotURL } from "dbotlinkgen";
const { BotURL } = require("dbotlinkgen");

const url = new BotURL()
    .setClient("942780735876628581")
    // .setScopes("bot") - Add "single" scope
    .setScopes(["bot", "applicationsCommands"]) // Add "multiple" scopes
    // .setGuild("942782748899307580") - Prefill a guild in the select menu
    // .disableSelect(true) - Disable the guild select menu
    // .addPermission("VIEW_CHANNEL") - Add permission one by one
    .addPermissions(["VIEW_CHANNEL", "SEND_MESSAGES"]); // Add multiple permissions

    if (!url.hasPermission("MANAGE_GUILD")) {
        url.addPermission("MANAGE_GUILD");
    }; // You can check and add permission as well

console.log(url.create()); // Create the url by using ".create()" method
```
### Reference
```js
const { BotURL } = require("dbotlinkgen");

const url = new BotURL()
    .setClient("942780735876628581")
    .setScopes(["bot", "applicationsCommands"])
    .setGuild("942782748899307580")
    .disableSelect(false)
    .addPermission("VIEW_CHANNEL")
    .addPermissions(["SEND_MESSAGES", "CREATE_INSTANT_INVITE"]);

    if (!url.hasPermission("VIEW_CHANNEL")) url.addPermission("VIEW_CHANNEL");

console.log(url.create());
```

<br>

## License
[MIT](LICENSE)