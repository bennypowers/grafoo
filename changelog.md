# CHANGELOG

## 1.4.0

### Features

- [babel-plugin, core] adds an option to babel-plugin to generate an id side by side with the query in Grafoo Object. This feature will enable persistent queries in the future.

### Contributors:

- @[adjourn](/adjourn)

## 1.3.0

### Features

- [core] add reset method to client to clear the cache.

### Fixes

- [babel-plugin] Correctly identify variables in arguments
- [babel-plugin] Don't throw error when encountering a Union node
- [babel-plugin] Prevent multiple instances of idFields to be added to the same node in a query

### Contributors:

- @[mogelbrod](/mogelbrod)

## 1.2.0

### Features

- [babel-plugin] allow schema to be omited on config

### Fixes

- [babel-plugin] fix client factory throwing when called with a variable as the second argument

## 1.1.1

### Fixes

- [preact] fix variables not being updated

## 1.1.0

### Features

- [bindings] enable load method to receive and update variables

## 1.0.9

### Fixes

- [core] fix bug preventing write to work when graphql payload wasn't destructured beforehand

## 1.0.8

### Fixes

- [bindings] for safety reusing `props` argument to avoid declaration of new variables

## 1.0.7

### Fixes

- [react, preact] reload when variables change

## 1.0.6

### Fixes

- [preact] correctly type children prop

## v0.0.1-beta.15

### Fixes

- [core] fix latest bug that afected also `client.read`

## v0.0.1-beta.14

### Fixes

- [core] allow queries to be partially cached on `client.write`

## v0.0.1-beta.13

### Features

- [preact, react] reload query on skip `Consumer` prop change to true

## v0.0.1-beta.12

### Fixes

- [preact] fix preact not rendering on nested componenents when data have been already received

## v0.0.1-beta.11

### Features

- [core] return a `partial` property in read to flag if a query result is only partially cached

### Fixes

- [bindings] fix bindings returning `loaded` equals to true if a query is only partially cached

## v0.0.1-beta.10

### Features

- [bindings, react, preact] revert latest release reintroducing `loaded` prop from bindings

## v0.0.1-beta.9

### Features

- [bindings, react, preact] remove `loaded` prop from bindings

## v0.0.1-beta.8

### Features

- [core] transport logic has been removed from core. This is a breaking change and here is the fix:

```diff
  import createClient from "@grafoo/core";

+ function fetchQuery(query, variables) {
+   const init = {
+     method: "POST",
+     body: JSON.stringify({ query, variables }),
+     headers: {
+       "content-type": "application/json"
+     }
+   };
+
+   return fetch("http://some.graphql.api", init).then(res => res.json());
+ }

- const client = createClient("http://some.graphql.api");
+ const client = createClient(fetchQuery);
```

## v0.0.1-beta.7

### Features

- [core, transport] allow other fetch options to be set other then headers

## v0.0.1-beta.6

### Fixes

- building packages locally

## v0.0.1-beta.5

### Fixes

- last failed attempt to install packages on local install

## v0.0.1-beta.4

### Fixes

- [babel-plugin] add @babel/cli

## v0.0.1-beta.3

### Fixes

- fix further packages dependencies

## v0.0.1-beta.2

### Fixes

- [bundle] add mri to package dependecies

## v0.0.1-beta.1

### Fixes

- add coverage to packages .npmignore

## v0.0.1-beta.0

### Fixes

- [core] fix objects not being cleaned from the cache on removal

## v0.0.1-alpha.17

### Fixes

- [bindings] fix block scope bug due to the use of var instead of let

## v0.0.1-alpha.16

### Fixes

- [babel-plugin] fix fragments not being compiled correctly in babel-plugin;
- [bindings] fix shouldupdate logic in bindings

## v0.0.1-alpha.15

### Fixes

- [babel-plugin] fix bug the was preventing fragments to be compiled in babel-plugin `sort-query`
- [babel-plugin] improve coverage

## v0.0.1-alpha.14

### Fixes

- [react] same as before but now it's working

## v0.0.1-alpha.13

### Fixes

- [react] fix a bug that was preventing component setState to work within the consumer render function

## v0.0.1-alpha.12

### Features

- replace `@babel/preset-typescript` for `rollup-plugin-typescript2` in `grafoo-bundle`

## v0.0.1-alpha.11

### Features

- bindings generated mutation functions now resolve with the mutation response
- bindings mutations `prop` does not require the update hook anymore

### Fixes

- bindings `loading` flag is always false whenever the `load` is triggered
