<script lang="ts">
  import type { FriseType } from "@/middleware/EntrepriseType";
  import { imageFormatter } from "@/stores/imageFormatter";
  import { webpSupported, checkWebpSupport } from "@/stores/webpSupported";
  import { Splide, SplideSlide, SplideTrack } from "@splidejs/svelte-splide";
  import "@splidejs/svelte-splide/css/core";
  import he from "he";
  export let title: string;
  export let frise: FriseType[];

  checkWebpSupport();
</script>

<section class="gradient">
  <div class="container">
    <h2>{he.decode(title)}</h2>
  </div>
  <div class="container splide-container">
    <Splide
      hasTrack={false}
      aria-label="Notre histoire"
      options={{
        gap: "1rem",
        rewind: true,
        perPage: 1,
        pagination: false,
        padding: { right: "15%" },
        speed: 1200,
        mediaQuery: "min",
        breakpoints: {
          768: {
            gap: "3.2rem",
            padding: { right: "20%" },
          },
          1330: {
            perPage: 2,
            gap: "2.2rem",
            padding: { right: "20%" },
          },
        },
      }}
    >
      <SplideTrack>
        {#each frise as { image, image_webp, titre, texte }}
          <SplideSlide>
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
              <img
                loading="lazy"
                src={image.url}
                alt={image.alt}
                title={image.title}
              />
            {/if}
            <h3>{he.decode(titre)}</h3>
            {@html texte}
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
  </div>
</section>

<style lang="scss">
  .gradient {
    padding-block: 5.3rem 3rem;
    background: var(--color-linear-gradient);
    color: white;

    :global(a) {
      color: white;
      text-decoration: none;
    }
  }

  h2 {
    font-weight: 500;
    text-align: left;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;

    @media (min-width: 768px) {
      margin-bottom: 4.6rem;
    }

    &::before {
      content: "";
      background: url("/signature-thema-environnement-blanc.svg") no-repeat;
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

  .container.splide-container {
    margin-right: 0;
    max-width: 97%;
  }

  h3 {
    font-size: 2.8rem;
    display: flex;
    align-items: center;
    gap: 1.25rem;
    margin-block: 1.3rem 0.9rem;
    line-height: 1.3;

    @media (min-width: 1330px) {
      font-size: 4.5rem;
    }

    &::after {
      content: "";
      height: 1px;
      width: 100%;
      background: white;
    }
  }

  .splide__arrow {
    width: 26.85px;
    height: 19.18px;
    background: transparent;
    border: none;
    padding: 0;
    margin: 0;
    margin-top: 2rem;

    img {
      width: 100%;
      height: 100%;
    }

    &--next {
      transform: rotate(180deg);
      margin-top: 0;
    }
  }
</style>
