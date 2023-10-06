<script lang="ts">
  import type { PageType } from "middleware/page";
  import type { DomaineType } from "middleware/domaineType";
  export let data: PageType<DomaineType>;
  import he from "he";
  import { webpSupported, checkWebpSupport } from "stores/webpSupported";
  import { imageFormatter } from "stores/imageFormatter";

  checkWebpSupport();

  const { acf, yoast } = data;
</script>

<svelte:head>
  <title>{he.decode(data.title)}</title>
  <meta name="description" content={he.decode(yoast.yoast_wpseo_metadesc)} />
</svelte:head>

<section class="hero-banner">
  <div class="container">
    <div class="image-container">
      {#if acf.image_haut_webp}
        <img
          src={imageFormatter(
            { webP: acf.image_haut_webp.url, old: acf.image_haut.url },
            webpSupported
          )}
          alt={acf.image_haut.url}
          title={acf.image_haut.title}
        />
      {:else}
        <img
          src={acf.image_haut.url}
          alt={acf.image_haut.alt}
          title={acf.image_haut.title}
        />
      {/if}
      <img
        src="/signature-thema-environnement-blanc.svg"
        alt="Logo Thema Environnement"
        class="logo-absolute"
      />
    </div>
    <div class="texte">
      <h1>{he.decode(data.title)}</h1>
      {@html data.content}
    </div>
  </div>
</section>

<style lang="scss">
  .hero-banner {
    margin-top: 2.2rem;
    margin-bottom: 9.2rem;

    .container {
      @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 0.4fr 1fr;
        gap: 3.5rem;
      }
    }

    .texte {
      margin-top: 1em;
      font-weight: 500;

      @media (min-width: 1330px) {
        font-size: 2rem;
      }

      :global(p) {
        margin-top: 1em;
      }
    }
  }

  h1 {
    color: var(--color-vert-deau);

    @media (min-width: 768px) {
      max-width: 50%;
    }

    @media (min-width: 1330px) {
      max-width: 100%;
    }
  }

  .image-container {
    max-width: 65%;
    margin-inline: auto;
    position: relative;
    width: fit-content;
    height: fit-content;
    border-top-left-radius: 20px;
    border-bottom-right-radius: 20px;

    @media (min-width: 768px) {
      max-width: 100%;
    }

    img:not(.logo-absolute) {
      border-top-left-radius: 20px;
      border-bottom-right-radius: 20px;
    }

    .logo-absolute {
      position: absolute;
      inset: 0;
      margin: auto;
      width: 56.82px;
      height: 47.61px;
    }
  }
</style>
