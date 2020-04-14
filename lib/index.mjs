'use strict'

import glob from 'glob'

const register = async (server, options) => {
  const routes = glob.sync('**/*.route.js', { absolute: true, cwd: server.app.cwd })
  let errorOccured = false

  for (const absolutePath of routes) {
    console.log('AbsolutPath', absolutePath)
    await import(absolutePath)
      .then(route => {
        server.route(route.default)
        console.log('Route: ', route.default.path, '(' + route.default.method + ')')
      })
      .catch(e => {
        errorOccured = true
        console.error('Error: cannot load route: ' + absolutePath)
      })
  }

  if (errorOccured) {
    throw new Error('Some errors occured while loading routes.')
  }
}

const plugin = {
  name: 'route-loader',
  version: '1.0.0',
  once: true,
  register
}

export default plugin
