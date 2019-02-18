# `@grafoo/http-transport`

<p><i>A Simple HTTP Client for GraphQL Servers</i></p>

<p>
  <a href=https://circleci.com/gh/grafoojs/grafoo>
    <img
      src=https://img.shields.io/circleci/project/github/grafoojs/grafoo/master.svg?label=build
      alt=build
    />
  </a>
  <a href=https://codecov.io/github/grafoojs/grafoo>
    <img
      src=https://img.shields.io/codecov/c/github/grafoojs/grafoo/master.svg
      alt="coverage"
    />
  </a>
  <a href=https://www.npmjs.com/package/@grafoo/http-transport>
    <img
      src=https://img.shields.io/npm/v/@grafoo/http-transport.svg
      alt=npm
    >
  </a>
  <a href=https://www.npmjs.com/package/@grafoo/http-transport>
    <img
      src=https://img.shields.io/npm/dm/@grafoo/http-transport.svg
      alt=downloads
    >
  </a>
  <a href=https://github.com/grafoojs/grafoo>
    <img
      src=https://img.shields.io/bundlephobia/minzip/@grafoo/http-transport.svg?label=size
      alt=size
    >
  </a>
  <a href=https://prettier.io>
    <img
      src=https://img.shields.io/badge/code_style-prettier-ff69b4.svg
      alt="code style: prettier"
    />
  </a>
  <a href=https://lernajs.io>
    <img
      src=https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg
      alt="mantained with: lerna"
    />
  </a>
  <a href=https://grafoo-slack.herokuapp.com>
    <img
      src=https://grafoo-slack.herokuapp.com/badge.svg
      alt="slack"
    />
  </a>
</p>

## Install

```
$ npm i @grafoo/http-transport
```

## Usage

`@grafoo/http-transport` default export is a factory that accepts as arguments `uri` and `fetchOptions` (that can be an object or a function):

```js
import createTransport from "@grafoo/http-transport";

const request = createTransport("http://some.graphql.api", () => ({
  headers: {
    authorization: storage.getItem("authorization")
  }
}));

const USER_QUERY = `
  query($id: ID!) {
    user(id: $id) {
      name
    }
  }
`;

const variables = { id: 123 };

request(USER_QUERY, variables).then(({ data }) => {
  console.log(data.user);
});
```

## Warning

As this package uses `fetch` and `Object.assign` under the hood, make sure to install the proper polyfills if you want to use it in your project.

## LICENSE

[MIT](https://github.com/grafoojs/grafoo/blob/master/LICENSE)
