<script>
  // @ts-nocheck

  import he from "he";
  export let data;
</script>

<svelte:head>
  <title>{he.decode(data.title)}</title>
  <meta
    name="description"
    content={he.decode(data.yoast.yoast_wpseo_metadesc)}
  />
</svelte:head>

<div class="container">
  <h1>{he.decode(data.title)}</h1>
  <article class="default">{@html data.content}</article>
</div>

<style lang="scss">
  .container {
    margin-top: 4.2rem;
  }

  h1 {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 0.3em;
    text-align: center;
    color: var(--color-vert-deau);
    line-height: 1.3;

    @media (min-width: 1330px) {
      gap: 5.5rem;
      justify-content: start;
      margin-left: 2em;
    }

    &::before {
      content: "";
      background: url("/signature-thema-environnement-vert.svg") no-repeat
        center;
      width: 94px;
      height: 78px;
    }
  }

  article {
    margin-top: 8.8rem;
  }
</style>
