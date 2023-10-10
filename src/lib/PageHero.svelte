<script lang="ts">
  import type { ImageType } from "@/middleware/imageType";

  import { imageFormatter } from "@/stores/imageFormatter";
  import { webpSupported, checkWebpSupport } from "@/stores/webpSupported";
  import he from "he";
  export let imageWebp: ImageType | null;
  export let image: ImageType;
  export let title: string;
  export let content: string;

  checkWebpSupport();
</script>

<section class="hero-banner">
  <div class="container">
    <div class="image-container">
      {#if imageWebp}
        <img
          src={imageFormatter(
            { webP: imageWebp.url, old: image.url },
            webpSupported
          )}
          alt={image.alt}
          title={image.title}
        />
      {:else}
        <img
          loading="lazy"
          src={image.url}
          alt={image.alt}
          title={image.title}
        />
      {/if}
      <img
        src="/signature-thema-environnement-blanc.svg"
        alt="Logo Thema Environnement"
        class="logo-absolute"
      />
    </div>
    <div class="texte">
      <h1>{he.decode(title)}</h1>
      {@html content}
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
