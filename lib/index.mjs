'use strict'

import glob from 'glob'

const register = async (server, options) => {
  const routes = glob.sync('**/*.route\.?(m)js', { absolute: true, cwd: server.app.cwd })
  let errorOccured = false

  for (const absolutePath of routes) {
    await import(absolutePath)
      .then(route => {
        server.route(route.default)
      })
      .catch(e => {
        errorOccured = true
        server.app.logger.error('Error: cannot load route: ' + absolutePath, error)
      })
  }

  if (errorOccured) {
    throw new Error('Some errors occured while loading routes.')
  }
}

const plugin = {
  name: 'hapi-routes-loader',
  version: '1.0.0',
  once: true,
  register
}

export default plugin
