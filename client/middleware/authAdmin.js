'use strict'

export default function ({ route, store, redirect, env }) {
  if (!store.state.isAuthAdmin) {
    if (!store.state.isAuthUser) {
      return redirect(`${env.basePath}signinAdmin?cb=${encodeURIComponent(route.fullPath)}`)
    } else {
      if (!store.state.user.isAdmin) {
        return redirect(`${env.basePath}notAdmin`)
      }
    }
  }
}
