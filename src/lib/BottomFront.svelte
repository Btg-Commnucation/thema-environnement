<script lang="ts">
  import he from "he";
  import type { FrontPage } from "@/middleware/FrontPage";
  import { imageFormatter } from "@/stores/imageFormatter";
  import { checkWebpSupport, webpSupported } from "@/stores/webpSupported";
  import { Link } from "svelte-routing";
  import { Splide, SplideSlide, SplideTrack } from "@splidejs/svelte-splide";
  export let item: FrontPage;
  export let setSlug: (url: string) => string;

  const { acf } = item;

  checkWebpSupport();
</script>

<section class="bottom-front">
  <div class="container">
    <h2>{he.decode(acf.titre_un_bas_de_page)}</h2>
    <div class="content-wrapper">
      <div class="content">
        {@html acf.texte_un_bas_de_page}
      </div>
      <Splide
        hasTrack={false}
        aria-label={he.decode(acf.titre_un_bas_de_page)}
        options={{
          gap: "1rem",
          rewind: true,
          perPage: 1,
          pagination: false,
          speed: 800,
        }}
      >
        <img
          src="/signature-thema-environnement-blanc.svg"
          alt="Logo Thema environnement en blanc"
          class="logo-absolute"
        />
        <SplideTrack>
          {#each acf.carrousel as { image, image_webp, texte }}
            <SplideSlide>
              {#if image_webp}
                <img
                  src={imageFormatter(
                    { webP: image_webp.url, old: image.url },
                    webpSupported
                  )}
                  width={image.width}
                  height={image.height}
                  alt={image.alt}
                  title={image.title}
                />
              {:else}
                <img
                  loading="lazy"
                  src={image.url}
                  alt={image.alt}
                  title={image.title}
                  width={image.width}
                  height={image.height}
                />
              {/if}
              {#if texte !== ""}
                <div class="text-carrousel">
                  {@html texte}
                </div>
              {/if}
            </SplideSlide>
          {/each}
        </SplideTrack>
        <div class="splide__arrows">
          <button class="splide__arrow splide__arrow--prev">
            <span class="screen-reader-text"
              >Cliquez ici pour passer à l'image précédente</span
            >
            <img
              loading="lazy"
              src="/arrow.svg"
              alt="flèche jaune pointant vers la gauche"
            />
          </button>
          <button class="splide__arrow splide__arrow--next">
            <span class="screen-reader-text"
              >Cliquez ici pour passer à l'image suivante</span
            >
            <img
              loading="lazy"
              src="/arrow.svg"
              alt="Flèche jaune pointant vers la droite"
            />
          </button>
        </div>
      </Splide>
      <Link to={`/${setSlug(acf.lien_un_bas_de_page.url)}`}
        >{acf.lien_un_bas_de_page.title}</Link
      >
    </div>
  </div>
</section>
<section class="team">
  <div class="container">
    <div class="desktop">
      <h2>{he.decode(acf.titre_deux_bas_de_page)}</h2>
      <div class="yellow">
        {@html acf.texte_deux_bas_de_page}
      </div>
    </div>
    {#if acf.image_bas_de_page_webp}
      <img
        src={imageFormatter(
          {
            webP: acf.image_bas_de_page_webp.url,
            old: acf.image_bas_de_page.url,
          },
          webpSupported
        )}
        width={acf.image_bas_de_page.width}
        height={acf.image_bas_de_page.height}
        alt={acf.image_bas_de_page.alt}
        title={acf.image_bas_de_page.title}
      />
    {:else}
      <img
        src={acf.image_bas_de_page.url}
        alt={acf.image_bas_de_page.alt}
        width={acf.image_bas_de_page.width}
        height={acf.image_bas_de_page.height}
        title={acf.image_bas_de_page.title}
      />
    {/if}
    <div class="yellow mobile">
      {@html acf.texte_deux_bas_de_page}
    </div>
    <Link class="link-to-page" to={`/${setSlug(acf.lien_bas_de_page.url)}`}
      >{acf.lien_bas_de_page.title}</Link
    >
  </div>
</section>

<style lang="scss">
  .team {
    margin-block: 4.1rem 10rem;

    .container {
      display: flex;
      flex-direction: column;

      @media (min-width: 1330px) {
        display: grid;
        grid-template-columns: 1fr 580px;
        column-gap: 1.3rem;
      }
    }

    .desktop {
      @media (min-width: 1330px) {
        grid-column: 2;
        grid-row: 1 / 3;
        width: 100%;
        align-self: end;
      }
    }

    h2 {
      margin-bottom: 3rem;

      @media (min-width: 768px) {
        text-align: center;
        margin-inline: auto;
      }
    }

    img {
      border-top-left-radius: 30px;
      border-bottom-right-radius: 30px;
      margin-bottom: 1rem;

      @media (min-width: 768px) {
        max-width: 503px;
        margin-bottom: 0;
        align-self: center;
      }

      @media (min-width: 1330px) {
        max-width: 100%;
        grid-row: 1;
        grid-column: 1;
        align-self: start;
      }
    }

    :global(a) {
      color: white;
      background: var(--color-jaune);
      font-size: 2rem;
      line-height: 1.3;
      border-radius: 40px;
      border: 1px solid var(--color-jaune);
      padding: 1rem 3rem;
      text-align: center;
      width: fit-content;
      margin-inline: auto;
      margin-top: 2rem;
      align-self: center;

      transition: 0.3s ease-in-out;

      @media (min-width: 768px) {
        font-size: 2.4rem;
        padding: 3rem;
      }

      @media (min-width: 1330px) {
        margin-top: 0;
        align-self: start;
        margin-bottom: 5rem;
      }

      &:hover {
        background: transparent;
        color: var(--color-jaune);
      }
    }
  }

  .bottom-front {
    margin-top: 6.7rem;
  }

  .desktop .yellow {
    display: none;

    @media (min-width: 1330px) {
      display: flex;
      width: 100%;
      margin-bottom: 0;
    }
  }

  .yellow {
    background: var(--color-jaune);
    color: black;
    padding: 2rem;
    border-top-left-radius: 30px;
    border-bottom-right-radius: 30px;
    margin-bottom: 4rem;
    line-height: 1.3;
    display: flex;
    flex-direction: column;
    gap: 1em;

    @media (min-width: 768px) {
      max-width: 558px;
      align-self: center;
      margin-top: 1rem;
    }

    @media (min-width: 1330px) {
      display: none;
    }

    :global(a) {
      font-size: initial;
      color: black;
      background: transparent;
      border: none;
      display: inline;
      margin: 0;
      padding: 0;
      text-align: inherit;
    }
  }

  h2 {
    font-size: 2.8rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    font-weight: 500;
    line-height: 1.3;
    text-transform: uppercase;

    @media (min-width: 1330px) {
      font-size: 3.2rem;
      gap: 1.3rem;
    }

    &::before {
      content: "";
      display: block;
      background: url("/signature-thema-environnement.svg") no-repeat;
      width: 57.87px;
      height: 48.49px;

      @media (min-width: 1330px) {
        width: 77.55px;
        height: 64.99px;
      }
    }
  }

  .content-wrapper {
    margin-top: 5.1rem;
    display: flex;
    flex-direction: column;

    @media (min-width: 1330px) {
      display: grid;
      grid-template-columns: 1fr 592px;
      align-items: center;
      column-gap: 5.3rem;
    }

    :global(a) {
      color: white;
      background: var(--color-jaune);
      font-size: 2rem;
      line-height: 1.3;
      border-radius: 40px;
      border: 1px solid var(--color-jaune);
      padding: 1rem 3rem;
      text-align: center;
      width: fit-content;
      margin-inline: auto;
      margin-top: 2rem;

      transition: 0.3s ease-in-out;

      @media (min-width: 768px) {
        font-size: 2.4rem;
        padding: 3rem;
      }

      @media (min-width: 1330px) {
        margin-top: 0;
      }

      &:hover {
        background: transparent;
        color: var(--color-jaune);
      }
    }

    .content {
      :global(ul) {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 0.3em;
      }

      :global(li) {
        display: flex;
        align-items: center;
        gap: 1.5rem;

        &::before {
          content: "";
          background: var(--color-jaune);
          width: 15px;
          height: 15px;
          border-radius: 100%;
        }
      }
    }

    :global(.splide) {
      border-top-left-radius: 30px;
      border-bottom-right-radius: 30px;
      position: relative;

      @media (min-width: 768px) {
        max-width: 592px;
        margin-inline: auto;
      }

      @media (min-width: 1330px) {
        grid-row: 1 / 3;
        grid-column: 2;
      }

      :global(.splide__slide img) {
        border-top-left-radius: 30px;
        border-bottom-right-radius: 30px;
        width: 100%;
      }
    }
  }

  .logo-absolute {
    display: none;

    @media (min-width: 768px) {
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      margin-block: auto;
      right: 1em;
      width: 35.32px;
      z-index: 100;
    }
  }

  .splide__arrow {
    width: 26.85px;
    height: 19.18px;
    background: transparent;
    border: none;
    padding: 0;
    margin: 0;
    margin-top: 3.1rem;

    img {
      width: 100%;
      height: 100%;
    }

    &--next {
      transform: rotate(180deg);
    }
  }

  .text-carrousel {
    color: var(--color-vert-deau);
    background: white;
    padding: 1.6rem;
    border-radius: 29px;
    text-align: center;
    font-size: 2rem;
    position: relative;
    z-index: 1000;
    max-width: 95%;
    margin-inline: auto;
    margin-top: -2em;

    @media (min-width: 768px) {
      position: absolute;
      margin-top: 0;
      bottom: 1.5em;
      left: 0;
      right: 0;
      margin-inline: auto;
      max-width: 340px;
    }
  }
</style>
