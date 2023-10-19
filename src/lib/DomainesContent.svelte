<script lang="ts">
  import type { ImageType } from "@/middleware/imageType";

  interface ColumnsType {
    image: ImageType;
    image_webp: ImageType;
    texte: string;
  }

  import { imageFormatter } from "@/stores/imageFormatter";
  import { webpSupported, checkWebpSupport } from "@/stores/webpSupported";
  export let titre: string;
  export let columns: ColumnsType[];
  export let texte: string;
  export let imageTitre: string;
  export let bulletColor: string;
  export let borderColor: string;

  checkWebpSupport();
</script>

<div
  class="container"
  style=" --theme-border: {borderColor}; --theme-bullet: {bulletColor}; --image-titre: url(/{imageTitre}) no-repeat;"
>
  <h2>{titre}</h2>
  <div class="column">
    {#each columns as column}
      <div class="row">
        <div class="image-row-container">
          <div class="background" />
          {#if column.image_webp}
            <img
              src={imageFormatter(
                { webP: column.image_webp.url, old: column.image.url },
                webpSupported
              )}
              alt={column.image.url}
              title={column.image.title}
            />
          {:else}
            <img
              src={column.image.url}
              alt={column.image.alt}
              title={column.image.title}
            />
          {/if}
        </div>
        <div class="texte-row-container">
          {@html column.texte}
        </div>
      </div>
    {/each}
  </div>
  <div class="bordered-texte">{@html texte}</div>
</div>

<style lang="scss">
  .container {
    max-width: 55%;
  }
  h2 {
    font-size: 26px;
    font-weight: 500;
    position: relative;
    display: grid;
    grid-template-columns: 55.87px 1fr;
    gap: 1rem;
    align-items: center;
    text-transform: uppercase;

    @media (min-width: 768px) {
      width: 80%;
      margin-inline: auto;
    }

    @media (min-width: 1330px) {
      grid-template-columns: 77.55px 1fr;
      gap: 2.92rem;
    }

    &::before {
      content: "";
      background-size: contain;
      background: var(--image-titre);
      width: 100%;
      height: 48.49px;
      margin-right: 1rem;

      @media (min-width: 1330px) {
        width: 100%;
        height: 64.99px;
        margin-right: 2.92rem;
      }
    }
  }

  .column {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.8rem;
    margin-block: 3.5rem 1rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      margin-block: 4.7rem 3.2rem;
    }

    @media (min-width: 1330px) {
      margin-block: 3.9rem 2.8rem;
    }
  }

  .row {
    display: flex;
    flex-direction: column;
    gap: 2.6rem;

    :global(p) {
      font-size: 2rem;
      font-weight: 500;

      @media (min-width: 1330px) {
        font-size: 2.4rem;
      }
    }

    :global(ul) {
      margin-top: 2.6rem;
      font-weight: 500;
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.7em;

      @media (min-width: 768px) {
        gap: 1em;
        margin-left: 2em;
      }

      @media (min-width: 1330px) {
        font-size: 2rem;
      }
    }

    :global(li) {
      display: grid;
      grid-template-columns: 10px 1fr;
      gap: 1.3rem;
      align-items: start;
      line-height: 1.3;

      @media (min-width: 768px) {
        grid-template-columns: 15px 1fr;
        gap: 2.1rem;
      }

      &::before {
        content: "";
        background: var(--theme-bullet);
        margin-top: 0.2em;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        display: flow-root;

        @media (min-width: 768px) {
          width: 15px;
          height: 15px;
          margin-top: 0.3em;
        }
      }
    }
  }

  .image-row-container {
    position: relative;
    max-width: 97%;
    margin-inline: auto;

    @media (min-width: 768px) {
      max-width: 100%;
      width: 100%;
    }

    img {
      position: relative;
      z-index: 1;
      width: 100%;
    }
  }

  .background {
    background: white;
    border: 1px solid var(--theme-border);
    position: absolute;
    width: 100%;
    height: 100%;
    right: -0.4em;
    bottom: -0.4em;

    @media (min-width: 768px) {
      bottom: -0.5em;
    }
  }

  .bordered-texte {
    border: 1px solid var(--theme-border);
    padding: 3rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    font-weight: 500;

    @media (min-width: 1330px) {
      font-size: 2rem;
    }
  }
</style>
