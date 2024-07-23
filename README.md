# Cron Expression Parser CLI

This project is a command-line interface (CLI) tool designed to parse and interpret cron expressions. It allows users to input cron expressions and outputs the timing schedule in a human-readable format. The primary purpose of this tool is to help users understand and debug cron schedules by providing detailed insights into when scheduled tasks will run.

## Improvements

There are TODOs in the project for potential improvements.

## Features

- **Parse Cron Expressions**: Input a cron expression and receive a breakdown of when the task is scheduled to run.

## Test/Lint/Build

Tests
`npm test`

Linting
`npm run lint`

Building
`npm run build`

## How to Run

To use the Cron Expression Parser CLI, follow these steps:

1. Navigate to the project directory.
2. Install the dependencies with `npm ci`.
3. Build the project: `npm build`
4. Run the CLI tool by executing `node dist/index.js parse-cron "<cron_expression>"`, replacing `<cron_expression>` with your actual cron expression.

    Or `npx ts-node src/index.ts parse-cron "<cron_expression>"` without building, if `npx` and `ts-node` installed.

Example:

```bash
node dist/index.js parse-cron "0-59/2,5 0-15/3,5 5 * 2-4,5,7,6,6 .usr/bla"
```



