# hapi-routes-loader

Route objects must be exported in a file (as default). Example:

```
export default {
  method: 'GET',
  path: '/my-route',
  handler: async (request, h) => {
    return 'Hello world'
  }
}
```

This plugin will looking for file ending with `.route.(m)js` and will load the object route via server.route


You must define a logger has `server.app.logger` with at least `info` method