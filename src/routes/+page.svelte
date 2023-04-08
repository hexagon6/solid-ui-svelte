<script>
  import { page } from '$app/stores'
  import { login, logout } from '@inrupt/solid-client-authn-browser'
  import Text from '$lib/components/text.svelte'

  const fakeOIDCIssuer = 'https://fakeurl.com'

  export let data
  $: session = data.session
  $: profile = data.profile

  let oidcIssuer = ''

  const sessionLogin = () => {
    const loginOptions = {
      oidcIssuer,
      redirectUrl: $page.url.href,
      clientName: 'Solid SDK Svelte Test App',
    }

    login(loginOptions)
  }

  const sessionLogout = () => {
    logout()
    session = { isLoggedIn: false }
    profile = null
  }
</script>

<div>
  <div class="controls">
    webId provider (OIDCIssuer) <input
      bind:value={oidcIssuer}
      placeholder={fakeOIDCIssuer}
    />
    <button
      type="button"
      disabled={!oidcIssuer}
      on:click={() => sessionLogin()}
    >
      Login
    </button>
    <button type="button" on:click={sessionLogout} data-testid="logout">
      Logout
    </button>
  </div>
  {#if session && session.info}
    <div class="small-font">
      session info:
      <pre>{JSON.stringify(session?.info, null, 2)}</pre>
    </div>
  {/if}
  <div class="bordered">
    {#if profile}
      <span class="small-font"> Data from your POD: </span>
      <div>
        Your storage space is "<Text
          solidDataset={profile?.webIdProfile}
          thing={session?.info?.webId}
          property={'http://www.w3.org/ns/pim/space#storage'}
        />"
      </div>
      <div>
        Your webId name is "<Text
          solidDataset={profile?.webIdProfile}
          thing={session?.info?.webId}
          property={'http://www.w3.org/2006/vcard/ns#fn'}
        />"
      </div>
      <div>
        {profile
          ? `${profile.altProfileAll.length} alt profiles found`
          : 'No profile found'}
      </div>
    {:else}
      <div>not authenticated, please log in</div>
    {/if}
  </div>
</div>

<style>
  * {
    font-family: arial;
  }

  pre {
    background: lightgrey;
    padding: 1em;
  }

  .controls {
    padding: 1em;
  }

  .bordered {
    padding: 1em;
    border-radius: 1em;
    background: purple;
    color: white;
    box-shadow: rgba(0, 0, 0, 0.2) 0 1px 1px 1px;
  }

  .small-font {
    font-size: 0.65em;
  }
</style>
