<script lang="ts">
  import type { Prestations } from "@/middleware/FrontPage";
  import he from "he";
  import { imageFormatter } from "@/stores/imageFormatter";
  import { webpSupported, checkWebpSupport } from "@/stores/webpSupported";
  import { Link } from "svelte-routing";

  export let prestationsUn: Prestations[];
  export let prestationsDeux: Prestations[];
  export let setSlug: (url: string) => string;

  checkWebpSupport();
</script>

<article>
  <div class="line" />
  <div class="prestations prestations-un">
    {#each prestationsUn as prestation}
      <div class="prestation">
        <div class="title">
          <h3>{he.decode(prestation.titre)}</h3>
          <div class="image">
            {#if prestation.image_webp}
              <img
                src={imageFormatter(
                  {
                    webP: prestation.image_webp.url,
                    old: prestation.image.url,
                  },
                  webpSupported
                )}
                alt={prestation.image.alt}
                title={prestation.image.title}
              />
            {:else}
              <img
                src={prestation.image.url}
                alt={prestation.image.alt}
                title={prestation.image.title}
              />
            {/if}
          </div>
        </div>
        {@html prestation.texte}
        <Link to={`/${setSlug(prestation.lien.url)}`}>
          {he.decode(prestation.lien.title)}
          <div class="arrow-container">
            <span />
            <span />
            <span />
          </div>
        </Link>
      </div>
    {/each}
  </div>
  <div class="prestations prestations-deux">
    {#each prestationsDeux as prestation}
      <div class="prestation">
        <div class="title">
          <h3>{he.decode(prestation.titre)}</h3>
          <div class="image">
            {#if prestation.image_webp}
              <img
                src={imageFormatter(
                  {
                    webP: prestation.image_webp.url,
                    old: prestation.image.url,
                  },
                  webpSupported
                )}
                alt={prestation.image.alt}
                title={prestation.image.title}
              />
            {:else}
              <img
                src={prestation.image.url}
                alt={prestation.image.alt}
                title={prestation.image.title}
              />
            {/if}
          </div>
        </div>
        {@html prestation.texte}
        <Link to={`/${setSlug(prestation.lien.url)}`}>
          {he.decode(prestation.lien.title)}
          <div class="arrow-container">
            <span />
            <span />
            <span />
          </div>
        </Link>
      </div>
    {/each}
  </div>
</article>

<style lang="scss">
  .arrow-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      background: var(--color-vert-deau);
      width: 18px;
      height: 2px;
      display: block;

      &:nth-of-type(2) {
        width: 7px;
        transform: translate(-6px, -2.2px) rotate(45deg);
      }

      &:nth-of-type(3) {
        width: 7px;
        transform: translate(-13px, 2.2px) rotate(-45deg);
      }
    }
  }

  article {
    position: relative;
    margin-block: 9rem 11.3rem;

    @media (min-width: 768px) {
      margin-block: 7rem 11.3rem;
    }

    @media (min-width: 1330px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      place-items: center;
      gap: 11rem;
    }
  }

  .line {
    position: absolute;
    width: 10px;
    height: 106%;
    z-index: -1;
    left: 2em;
    top: 0;
    bottom: 0;
    margin-block: auto;
    border-radius: 20px;
    background: linear-gradient(
      135deg,
      var(--color-vert) 0%,
      var(--color-vert-deau) 100%
    );

    @media (min-width: 1300px) {
      right: 0;
      margin: auto;
    }
  }

  img {
    max-width: 45px;

    @media (min-width: 768px) {
      max-width: 59px;
    }
  }

  .prestations {
    display: flex;
    flex-direction: column;
    gap: 7rem;

    @media (min-width: 1330px) {
      justify-content: center;
      align-items: center;
    }

    :global(p) {
      margin-left: 6rem;
      line-height: 1.3;
      font-size: 1.6rem;

      @media (min-width: 768px) {
        margin-left: 12.5rem;
        line-height: 1.7;
      }

      @media (min-width: 1330px) {
        font-size: 2rem;
        margin-left: 0;
        max-width: 457px;
        align-self: end;
      }
    }

    :global(a) {
      align-self: end;
      background: var(--color-light-vert);
      color: var(--color-vert-deau);
      padding: 0.7rem 2rem;
      padding-right: 0.5rem;
      border-radius: 24px;
      border: 1px solid var(--color-light-vert);
      transition: 0.3s ease-in-out;
      margin-top: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;

      @media (min-width: 768px) {
        align-self: start;
        margin-left: 12rem;
        padding: 1rem 1.6rem;
        padding-right: 0;
        margin-top: 2rem;
      }

      @media (min-width: 1330px) {
        font-size: 2rem;
        margin-left: 0;
        margin-top: 1.6rem;
      }

      &:hover {
        background: transparent;
        border-color: var(--color-vert-deau);
      }
    }
  }

  .prestation {
    display: flex;
    flex-direction: column;
  }

  .prestations-deux {
    margin-top: 7rem;

    @media (min-width: 1330px) {
      margin-top: 0;

      .image {
        width: 116px;
        height: 116px;

        img {
          max-width: 69px;
        }
      }

      h3 {
        padding-inline: 5.7rem 1rem;
        margin-left: -0.5em;
        font-size: 2.4rem;

        @media (min-width: 1330px) {
          padding-right: 2.5rem;
          padding-block: 1.2rem;
          line-height: 1;
        }
      }
    }
  }

  @media (min-width: 1330px) {
    .prestations-un {
      align-items: end;
      text-align: right;

      .title {
        grid-template-columns: 1fr 78px;
        justify-items: end;
      }

      .image {
        grid-column: 2;
        width: 116px;
        height: 116px;

        img {
          max-width: 69px;
        }
      }

      h3 {
        grid-column: 1;
        padding-inline: 1rem 5.7rem;
        margin-left: 0;
        margin-right: -0.5em;
        font-size: 2.4rem;

        @media (min-width: 1330px) {
          padding-block: 1.2rem;
          padding-left: 2.5rem;
          line-height: 1;
        }
      }

      :global(a) {
        align-self: end;
      }
    }
  }

  .image {
    background: var(--color-light-vert);
    width: 78px;
    height: 78px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    grid-row: 1;

    @media (min-width: 768px) {
      width: 115px;
      height: 115px;
    }
  }

  .title {
    display: grid;
    grid-template-columns: 78px 1fr;
    margin-bottom: 0.8rem;

    @media (min-width: 768px) {
      margin-bottom: 0;
      margin-bottom: -0.5rem;
    }

    @media (min-width: 1330px) {
      margin-bottom: 2.5rem;
    }
  }

  h3 {
    color: white;
    background: var(--color-vert-deau);
    font-weight: 500;
    font-size: 2rem;
    border-radius: 1em;
    margin-left: -1.6em;
    position: relative;
    z-index: -1;
    grid-column: 2;
    grid-row: 1;
    line-height: 1.3;
    margin-block: auto;
    padding-block: 0.5rem;
    padding-inline: 4rem 2.5rem;
    width: fit-content;

    @media (min-width: 768px) {
      font-size: 2.4rem;
      margin-left: 0.8rem;
    }
  }
</style>
