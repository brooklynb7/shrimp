'use strict'

export default function ({ route, store, redirect }) {
  if (!store.state.isAuthenticated) {
    return redirect(`/signin?cb=${encodeURIComponent(route.fullPath)}`)
  }
}
