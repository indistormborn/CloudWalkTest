# Quake Game Log Parser

This repo is a simple parser for game logs. It uses `Node v20` and it is written in `TypeScript`. Unit tests are written using `Jest`. The project runs as an interactive CLI application using `Inquirer.js`.

## Installation

To run the project, you need to have `Node v20` installed.
We have a `.nvmrc` file to help you with that, but to use it you need `nvm` installed.

```bash
nvm use
npm install
npm run build
```

## Usage

After starting the program, it would ask you for the path to the log file and the output format. Also, if you want to save the report in a file, process another one or exit the program.

```bash
npm start
```

## Testing

To run the tests, you can use the following command:

```bash
npm test
```
