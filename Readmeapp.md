```
npm install

// Testing with jest
npm install --save-dev jest
npm install supertest --save-dev

Here are the steps to use and configure ESLint for Node.js projects:

Install ESLint as a development dependency:

npm install eslint --save-dev

Create an .eslintrc.js configuration file in the root directory of your project. This file will define the rules and settings for ESLint. You can create this file manually, or use the --init flag with ESLint to generate a default configuration file:

npx eslint --init
This will walk you through a series of prompts to generate a configuration file based on your preferences. You can also modify the generated file to include additional rules and settings.

In your package.json file, add a lint script that runs ESLint on your project:

"scripts": {
  "lint": "eslint ."
},
This script will run ESLint on all files in your project.

To run ESLint and validate your code, run the following command:
npm run lint
This will run the lint script defined in your package.json and output any linting errors or warnings.

// Fix lint
npx eslint --fix .

```