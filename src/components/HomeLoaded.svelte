<script lang="ts">
  import he from "he";
  import type { FrontPage } from "@/middleware/FrontPage";
  import { imageFormatter } from "@/stores/imageFormatter";
  import { checkWebpSupport, webpSupported } from "@/stores/webpSupported";
  import LineFront from "@/lib/LineFront.svelte";
  import { Link } from "svelte-routing";
  import BottomFront from "@/lib/BottomFront.svelte";
  export let item: FrontPage;

  const setSlug = (url: string): string => {
    const newUrl = new URL(url);
    const segments = newUrl.pathname.split("/").filter(Boolean);

    return segments[segments.length - 1];
  };

  const { acf, yoast, title, content } = item;

  checkWebpSupport();
</script>

<svelte:head>
  <title>{he.decode(title)}</title>
  <meta name="description" content={he.decode(yoast.yoast_wpseo_metadesc)} />
</svelte:head>

<h1 class="screen-reader-text">{he.decode(title)}</h1>
<section class="hero-banner">
  <div class="texte-hero">
    {@html content}
  </div>
  <div class="image-container">
    {#if acf.image_haut_de_page_webp}
      <img
        src={imageFormatter(
          {
            webP: acf.image_haut_de_page_webp.url,
            old: acf.image_haut_de_page.url,
          },
          webpSupported
        )}
        alt={acf.image_haut_de_page.alt}
        title={acf.image_haut_de_page.title}
      />
    {:else}
      <img
        src={acf.image_haut_de_page.url}
        alt={acf.image_haut_de_page.alt}
        title={acf.image_haut_de_page.title}
      />
    {/if}
    <img
      src="/signature-thema-environnement-blanc.svg"
      alt="Logo Thema Environnement"
      class="logo-absolute"
    />
  </div>
</section>
<section class="yellow">
  <div class="container">
    {@html acf.texte_fond_jaune}
  </div>
</section>
<section class="white">
  <div class="container">
    <h2>{he.decode(acf.titre_un)}</h2>
    <div class="content">
      {@html acf.contenu}
    </div>
  </div>
</section>
<section class="specialiste">
  <div class="container">
    <h2>{he.decode(acf.titre_deux)}</h2>
    <LineFront
      prestationsUn={acf.prestations_un}
      prestationsDeux={acf.prestations_deux}
      {setSlug}
    />
  </div>
</section>
<section class="gradient">
  <div class="container">
    <div class="gradient-image">
      <div class="absolute" />
      {#if acf.image_fond_vert_webp}
        <img
          src={imageFormatter(
            {
              webP: acf.image_fond_vert_webp.url,
              old: acf.image_fond_vert.url,
            },
            webpSupported
          )}
          alt={acf.image_fond_vert.alt}
          title={acf.image_fond_vert.title}
        />
      {:else}
        <img
          src={acf.image_fond_vert.url}
          alt={acf.image_fond_vert.alt}
          title={acf.image_fond_vert.title}
        />
      {/if}
    </div>
    <div class="gradient-texte">
      <img
        src="/signature-thema-environnement.svg"
        alt="Logo de Thema environnement en jaune"
        class="logo"
      />
      <div class="gradient-content">
        <div class="container-content-bg">
          <div class="absolut-content" />
          <div class="content">
            {@html acf.texte_fond_vert}
            <Link to={`/${setSlug(acf.lien_fond_vert.url)}`}
              >{acf.lien_fond_vert.title}</Link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<BottomFront {item} {setSlug} />

<style lang="scss">
  .hero-banner {
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;

    @media (min-width: 1330px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .image-container {
    position: relative;
    width: 100%;
    height: 100%;

    img:not(.logo-absolute) {
      width: 100%;
      object-fit: cover;
      height: 100%;
    }
  }

  .logo-absolute {
    position: absolute;
    width: 55px;
    bottom: 2em;
    right: 1em;

    @media (min-width: 1330px) {
      width: 94px;
    }
  }

  .texte-hero {
    background: var(--color-linear-gradient);
    color: white;
    text-align: center;
    padding-block: 2rem;
    font-size: 3rem;
    font-weight: 500;
    line-height: 1.3;
    height: 100%;

    @media (min-width: 768px) {
      font-size: 4rem;
    }

    @media (min-width: 1330px) {
      font-size: 5rem;
      text-align: left;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: end;

      :global(p) {
        max-width: 70%;
        margin-right: 2em;
      }
    }

    @media (min-width: 1560px) {
      :global(p) {
        max-width: 58%;
      }
    }
  }

  .yellow {
    background: var(--color-jaune);
    padding-block: 3.9rem;
    font-size: 2.4rem;
    color: white;
    text-align: center;
  }

  .white {
    margin-top: 6.2rem;

    @media (min-width: 1330px) {
      .container {
        max-width: min(66%, 701px);
      }
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

  .content {
    @media (min-width: 1330px) {
      font-size: 2rem;
    }

    :global(p) {
      margin-top: 2.1rem;
    }
  }

  .specialiste {
    margin-top: 3rem;

    .container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    h2 {
      text-align: center;
    }
  }

  .container-content-bg {
    position: relative;
    z-index: 2;
    width: fit-content;
    height: fit-content;
  }

  .gradient {
    background: var(--color-linear-gradient);
    padding-block: 4rem;

    .container {
      display: flex;
      flex-direction: column;

      @media (min-width: 1091px) {
        max-width: min(75%, 1100px);
      }

      @media (min-width: 1330px) {
        align-items: start;
      }
    }

    .logo {
      width: 47.87px;
      align-self: end;

      @media (min-width: 768px) {
        width: 57.87px;
        margin-right: 7em;
      }

      @media (min-width: 1330px) {
        width: 94px;
        align-self: start;
        margin-right: 0;
        margin-left: 3em;
      }
    }

    .absolut-content {
      display: none;

      @media (min-width: 768px) {
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        border: 1px solid white;
        bottom: -1em;
        right: -1em;
        z-index: -1;
      }
    }

    .content {
      background: var(--color-vert-deau);
      color: white;
      display: flex;
      flex-direction: column;
      gap: 1em;
      font-weight: 500;
      padding: 3rem 1.5rem;
      margin-top: 0.5rem;
      position: relative;
      z-index: 2;

      @media (min-width: 768px) {
        padding: 6rem 4rem;
        margin-top: 1.7rem;
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

        &:hover {
          background: transparent;
          color: var(--color-jaune);
        }
      }

      :global(p) {
        margin-top: 0;
      }

      @media (min-width: 1330px) {
        font-size: 2rem;
      }
    }
  }

  .gradient-texte {
    align-self: end;
    max-width: 95%;
    display: flex;
    flex-direction: column;
    margin-top: -6em;
    position: relative;
    z-index: 3;

    @media (min-width: 768px) {
      max-width: min(75%, 630px);
      margin-right: 2rem;
      margin-top: -38rem;
    }

    @media (min-width: 1330px) {
      margin-top: -56rem;
    }
  }

  .gradient-image {
    position: relative;
    max-width: min(80%, 473px);
    z-index: 2;

    img {
      width: 100%;
    }

    .absolute {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 1px solid white;
      top: -0.6em;
      right: -0.6em;
      z-index: -1;

      @media (min-width: 768px) {
        top: -1em;
        right: -1em;
      }
    }
  }
</style>