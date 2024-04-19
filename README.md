## Fancy-http

"fancy-http" is a handy tool that'll help you to make different http requests with so less code. It is also made for
more manageable for the developers. Currently it supports 4 http methods: GET, POST, PUT & DELETE
### Install from npm
```js
npm i fancy-http
```
## Supported Methods

```js
import fr from "fancy-http";
fr.get(url, headers); // headers is optional
fr.post(url, body, headers); // headers is optional
fr.put(url, body, headers); // headers is optional
fr.delete(url, headers); // headers is optional
```

## Code example

```js
import fr from "fancy-http";
const headers = { "Content-Type": "application/json"};
const response = await fr.get("http://www.example.com", headers);
console.log(response); // For successfull request you will see a FancyResponse object with three properties: data, status and statusText otherwise you'll recieve a FancyError object.
```
Thank You.. Hope you'll love it.
