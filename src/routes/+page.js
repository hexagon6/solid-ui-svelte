import { browser } from '$app/environment'
import { getProfileAll } from '@inrupt/solid-client'
import {
  handleIncomingRedirect,
  getDefaultSession,
} from '@inrupt/solid-client-authn-browser'

export async function load({ fetch, url }) {
  let session
  let profile

  if (browser) {
    console.log('handling incoming redirect')
    await handleIncomingRedirect({
      url: url.href,
      restorePreviousSession: true,
    })
    session = getDefaultSession()
    if (session?.info?.webId !== undefined) {
      await getProfileAll(session?.info?.webId, {
        // fetch: session.fetch,
        fetch,
      }).then((p) => (profile = p))
    }
    console.log('finished handling incoming redirect')
    return {
      session,
      profile,
    }
  }
}
