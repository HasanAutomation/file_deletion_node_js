# node-file-remover

Delete files from a list of folders inside a parent folder based on file extension

## Installation

```js
# using npm
npm install node-file-remover

# using yarn
yarn add node-file-remover
```

## Usage

```js
# using require
const { deleteFileAdvanced } = require('node-file-remover');

# using import
import { deleteFileAdvanced } from 'node-file-remover';
```

## Example

```js
const folderPath = 'D:/app';
const fileExt = 'mp4';
deleteFileAdvanced(folderPath, fileExt);
```
