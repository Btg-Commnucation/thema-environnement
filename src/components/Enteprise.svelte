<script lang="ts">
  import Frise from "@/lib/Frise.svelte";
  import PageHero from "@/lib/PageHero.svelte";
  import type { EntrepriseType } from "@/middleware/EntrepriseType";
  import type { PageType } from "@/middleware/page";
  import { imageFormatter } from "@/stores/imageFormatter";
  import { checkWebpSupport, webpSupported } from "@/stores/webpSupported";
  import he from "he";
  export let data: PageType<EntrepriseType>;

  checkWebpSupport();

  const { acf, yoast } = data;
</script>

<svelte:head>
  <title>{he.decode(data.title)}</title>
  <meta name="description" content={he.decode(yoast.yoast_wpseo_metadesc)} />
</svelte:head>

<PageHero
  imageWebp={acf.image_haut_webp}
  image={acf.image_haut}
  title={data.title}
  content={data.content}
/>
<Frise title={acf.titre} frise={acf.frise} />
<section class="yellow">
  <div class="container">
    {@html acf.texte_fond_jaune}
  </div>
</section>
<section class="white">
  <div class="container">
    {@html acf.contenu}
    <h2>{he.decode(acf.titre_colonne)}</h2>
    <ul class="valeurs">
      {#each acf.triple_colonnes as { image_webp, image, texte }}
        <li>
          {#if image_webp}
            <img
              src={imageFormatter(
                { webP: image_webp.url, old: image.url },
                webpSupported
              )}
              alt={image.alt}
              title={image.title}
            />
          {:else}
            <img src={image.url} alt={image.alt} title={image.title} />
          {/if}
          {@html texte}
        </li>
      {/each}
    </ul>
  </div>
</section>
<section class="yellow">
  <div class="container">
    {@html acf.texte_fond_jaune_bas}

    {#if acf.image_fond_jaune_bas_webp}
      <img
        src={imageFormatter(
          {
            webP: acf.image_fond_jaune_bas_webp.url,
            old: acf.image_fond_jaune_bas.url,
          },
          webpSupported
        )}
        alt={acf.image_fond_jaune_bas.alt}
        title={acf.image_fond_jaune_bas.title}
      />
    {:else}
      <img
        src={acf.image_fond_jaune_bas.url}
        alt={acf.image_fond_jaune_bas.alt}
        title={acf.image_fond_jaune_bas.title}
      />
    {/if}
  </div>
</section>

<style lang="scss">
  .yellow {
    background: var(--color-jaune);
    padding: 5.4rem;
    font-size: 2rem;
    color: white;

    img {
      margin-top: 3rem;
      width: 100%;
      max-width: 788px;
      margin-inline: auto;
    }

    @media (min-width: 1330px) {
      font-size: 2.4rem;
    }
  }

  .white {
    margin-block: 6.9rem 7.4rem;
    font-size: 1.6rem;

    @media (min-width: 1330px) {
      font-size: 2rem;
    }

    :global(h2) {
      font-weight: 500;
      text-transform: uppercase;
      text-align: center;
      margin-bottom: 10rem;
      display: flex;
      justify-content: center;
      align-items: center;

      &::before {
        content: "";
        background: url("/signature-thema-environnement.svg") no-repeat;
        background-size: contain;
        width: 57.87px;
        height: 48.49px;
        display: inline-block;
        margin-right: 1rem;

        @media (min-width: 1330px) {
          width: 77.55px;
          height: 65px;
          margin-right: 2.9rem;
        }
      }
    }

    .valeurs {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2.4rem;
      margin-left: 0;

      @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        column-gap: 6.7rem;
      }

      @media (min-width: 1330px) {
        grid-template-columns: repeat(3, 1fr);
        column-gap: 5.4rem;
      }

      li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-top-left-radius: 10px;
        border-bottom-right-radius: 10px;
        padding: 4.8rem 2rem;
        background: var(--color-very-light-vert);
        text-align: center;
        height: fit-content;
        width: 100%;

        @media (min-width: 768px) {
          &:nth-of-type(2) {
            grid-row: 1 / 3;
            grid-column: 2;
          }
        }

        @media (min-width: 1330px) {
          &:nth-of-type(2) {
            grid-row: auto;
            grid-column: auto;
          }
        }

        :global(h3) {
          margin-block: 3.2rem;
          text-align: center;
          font-weight: 500;
          color: var(--color-vert-deau);
          font-size: 2.4rem;
        }

        :global(p) {
          font-size: 1.6rem;
          font-weight: 500;

          &:not(:first-of-type) {
            margin-top: 1em;
          }

          @media (min-width: 1330px) {
            font-size: 2rem;
          }
        }

        img {
          max-width: 94.98px;
        }
      }

      li::before {
        display: none;
      }
    }

    :global(ul) {
      list-style: none;
      margin-left: 1em;
      display: flex;
      flex-direction: column;
      gap: 1em;
      margin-bottom: 4.8rem;
    }

    :global(li) {
      display: grid;
      grid-template-columns: 15px 1fr;
      gap: 1.8rem;
      line-height: 1.3;

      &::before {
        content: "";
        background: var(--color-jaune);
        border-radius: 50%;
        width: 15px;
        height: 15px;
        margin-top: 0.3em;
      }
    }
  }
</style>
