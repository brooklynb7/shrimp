'use strict'

import routers from '../routes'
import * as _ from 'lodash'

export default app => {
  _.each(routers, (router) => {
    router(app)
  })
}
