<script>
  /**
   * @type {{ graphs: { default: { [x: string]: { predicates: { [x: string]: { literals: { [x: string]: any; }; }; }; }; }; }; type: string; }}
   */
  export let solidDataset
  /**
   * @type {string | number | undefined}
   */
  export let thing
  /**
   * @type {string | number | undefined}
   */
  export let property

  const literal = 'http://www.w3.org/2001/XMLSchema#string'
</script>

{#if solidDataset?.type === 'Dataset'}
  {#if solidDataset.graphs.default[thing].type === 'Subject'}
    {@const t = solidDataset.graphs.default[thing].predicates[property]}
    {#if t}
      {#if Object.prototype.hasOwnProperty.call(t, 'namedNodes')}
        {t.namedNodes}
      {:else if Object.prototype.hasOwnProperty.call(t, 'literals')}
        {t.literals[literal]}
      {/if}
    {:else}
      {t}
    {/if}
  {/if}
{/if}
