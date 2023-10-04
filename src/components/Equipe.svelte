<script>
  // @ts-nocheck
  import { webpSupported, checkWebpSupport } from "stores/webpSupported";
  import { imageFormatter } from "stores/imageFormatter";
  import he from "he";
  export let data;

  checkWebpSupport();
</script>

<svelte:head>
  <title>{he.decode(data.title)}</title>
  <meta
    name="description"
    content={he.decode(data.yoast.yoast_wpseo_metadesc)}
  />
</svelte:head>

<section class="hero-banner">
  <div class="container">
    <div class="title-container">
      <h1>{he.decode(data.title)}</h1>
    </div>
    <div class="texte">
      {@html data.content}
    </div>
  </div>
</section>
