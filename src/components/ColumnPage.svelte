<script lang="ts">
  import type { PageType } from "@/middleware/page";
  import type { ColumnPageType } from "@/middleware/ColumnPageType";
  import { webpSupported, checkWebpSupport } from "stores/webpSupported";
  import { imageFormatter } from "stores/imageFormatter";
  import he from "he";
  export let data: PageType<ColumnPageType>;

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
    <div class="circle">
      <img
        src={data.acf.image_haut_de_page?.url}
        alt={data.acf.image_haut_de_page?.alt}
        title={data.acf.image_haut_de_page?.title}
      />
    </div>
    <div class="content">
      <h1>{he.decode(data.title)}</h1>
      <div class="txt">
        {@html data.acf.texte_haut_de_page}
      </div>
    </div>
  </div>
</section>

<article>
  <div class="container">
    {#each data.acf.colonne as element}
      <div class="element">
        {#if element.image_webp}
          <img
            src={imageFormatter(
              {
                webP: element.image_webp.url,
                old: element.image_normal.url,
              },
              webpSupported
            )}
            alt={element.image_normal.alt}
            title={element.image_normal.title}
          />
        {:else}
          <img
            src={element.image_normal.url}
            alt={element.image_normal.alt}
            title={element.image_normal.title}
          />
        {/if}
        {#if element.titre}
          <h2>
            <img
              src="/signature-thema-environnement.svg"
              alt="Logo thema en jaune"
            /><span>{he.decode(element.titre)}</span>
          </h2>
        {/if}
        {#if element.texte}
          <div>{@html element.texte}</div>
        {/if}
      </div>
    {/each}
  </div>
</article>
{#if data.content}
  <section class="bottom-content">
    <div class="container">
      {@html data.content}
    </div>
  </section>
{/if}

<style lang="scss">
  .bottom-content {
    background: var(--color-jaune);
    color: white;
    margin-top: 6.3rem;
    padding-block: 5.6rem;
    font-size: 1.8rem;
    font-weight: 500;

    :global(p) {
      gap: 1em;
      max-width: 973px;
      margin-inline: auto;
    }

    @media (min-width: 768px) {
      font-size: 2.4rem;
    }
  }

  article {
    margin-block: 4.9rem 6.3rem;
    color: var(--color-gris);

    @media (min-width: 1330px) {
      margin-top: 5.2rem;
    }

    .container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 6.2rem;

      @media (min-width: 768px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 2rem;
        row-gap: 3rem;
        justify-items: center;
        align-items: start;
      }

      @media (min-width: 1330px) {
        row-gap: 7rem;
        column-gap: 12rem;
      }
    }

    :global(ul) {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 1em;
      line-height: 1.3;

      @media (min-width: 768px) {
        margin-left: 2rem;
      }

      @media (min-width: 1330px) {
        font-size: 2rem;
      }
    }

    :global(li) {
      display: grid;
      grid-template-columns: 15px 1fr;
      gap: 1em;

      &::before {
        content: "";
        background: var(--color-jaune);
        width: 15px;
        height: 15px;
        border-radius: 50%;
        margin-top: 0.2em;
      }
    }

    .element {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      max-width: 580px;
    }

    h2 {
      font-size: calc(20px + (32 - 20) * ((100vw - 320px) / (1920 - 320)));
      text-transform: uppercase;
      line-height: 1.2;
      font-weight: 500;
      margin-top: 3rem;
      margin-bottom: 2.5rem;
      display: grid;
      grid-template-columns: 57px 1fr;
      align-items: center;
      gap: 1rem;
      width: 100%;

      @media (min-width: 768px) {
        margin-bottom: 1.7rem;
      }

      @media (min-width: 1330px) {
        grid-template-columns: 77px 1fr;
        margin-bottom: 5.2rem;
        gap: 2.9rem;
      }
    }

    :global(p) {
      font-weight: 500;

      @media (min-width: 1330px) {
        font-size: 2rem;
      }
    }

    :global(p:not(:first-of-type)) {
      margin-top: 2em;
    }
  }

  .hero-banner {
    background: var(--color-linear-gradient);
    color: white;
    padding-block: 3.8rem 5.1rem;

    @media (min-width: 1330px) {
      padding-block: 8rem;
    }

    .container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      @media (min-width: 1330px) {
        display: grid;
        grid-template-columns: 208px 1fr;
        gap: 4.2rem;
      }
    }

    .txt {
      display: flex;
      flex-direction: column;
      gap: 3.5rem;
      font-weight: 500;

      @media (min-width: 1330px) {
        font-size: 2rem;
        gap: 2.7rem;
        line-height: 1.3;
      }
    }

    h1 {
      text-align: center;
      margin-top: 2.2rem;
      margin-bottom: 1.6rem;
      line-height: 1.2;

      @media (min-width: 768px) {
        margin-top: 1.4rem;
      }

      @media (min-width: 1330px) {
        margin-top: 0;
        margin-bottom: 2.5rem;
        text-align: left;
      }
    }

    .circle {
      width: 148px;
      height: 148px;
      background: var(--color-light-vert);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;

      @media (min-width: 1330px) {
        width: 208px;
        height: 208px;
      }

      img {
        width: 85px;

        @media (min-width: 1330px) {
          width: 116px;
        }
      }
    }
  }
</style>
