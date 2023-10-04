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

<h1>{data.title}</h1>
