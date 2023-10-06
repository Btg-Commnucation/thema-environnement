<script lang="ts">
  import type { PageType } from "middleware/page";
  import type { EquipeType } from "middleware/EquipeType";
  import { webpSupported, checkWebpSupport } from "stores/webpSupported";
  import { imageFormatter } from "stores/imageFormatter";
  import EquipeThemaImg from "/equipe-thema-environnement.jpg";
  import EquipeThemaImgWebp from "/equipe-thema-environnement.webp";
  import he from "he";
  import { Link } from "svelte-routing";
  export let data: PageType<EquipeType>;

  const getSlug = (url: string) => {
    const urlArray = url.split("/");
    return urlArray[urlArray.length - 2];
  };

  checkWebpSupport();

  const { yoast, acf } = data;
</script>

<svelte:head>
  <title>{he.decode(data.title)}</title>
  <meta name="description" content={he.decode(yoast.yoast_wpseo_metadesc)} />
</svelte:head>

<section class="hero-banner">
  <div class="container">
    <div class="title-container">
      <img
        src={imageFormatter(
          { webP: EquipeThemaImgWebp, old: EquipeThemaImg },
          webpSupported
        )}
        alt="L'équipe Thema entrain de travailler"
      />
      <h1>{he.decode(data.title)}</h1>
    </div>
    <div class="texte">
      {@html data.content}
    </div>
  </div>
</section>

<section class="equipe">
  <div class="container">
    <h2>{he.decode(acf.titre_equipe)}</h2>
    <div class="members">
      {#each acf.membre as member}
        <div class="member">
          {#if member.image_webp}
            <img
              style="height: {member.image.width}px"
              src={imageFormatter(
                { webP: member.image_webp.url, old: member.image.url },
                webpSupported
              )}
              alt={member.image.alt}
              title={member.image.title}
            />
          {:else}
            <img
              style="height {member.image.width}px"
              src={member.image.url}
              alt={member.image.alt}
              title={member.image.title}
            />
          {/if}
          <h3>{he.decode(member.nom)}</h3>
          <p>{he.decode(member.poste)}</p>
        </div>
      {/each}
    </div>
  </div>
</section>
<section class="equipe-orga">
  <div class="container">
    <h2>Équipe & organigramme</h2>
    <div class="organigramme">
      {#each acf.organigramme as element}
        <div>
          <strong>{he.decode(element.nombre)}</strong>
          <p>{he.decode(element.texte)}</p>
        </div>
      {/each}
    </div>
  </div>
</section>
<section class="agence-section">
  <div class="container">
    <div class="agences-container">
      {#each acf.agences as agence}
        <div class="agence">
          <img
            src="/marker-thema.svg"
            alt="Pictogramme d'un pin de géolocalisation"
            class="pin"
          />
          <h3>{he.decode(agence.titre_agence)}</h3>
          {#if agence.siege_social === "Oui"}
            <small>(siège social)</small>
          {/if}
          <div class="bordered-container">
            {@html agence.texte}
          </div>
        </div>
      {/each}
    </div>
    <div class="txt">{@html acf.texte_sous_organigramme_agence}</div>
    <div class="contact-us">
      <Link to={`/${getSlug(acf.bouton.url)}`} target={acf.bouton.target}
        >{he.decode(acf.bouton.title)}</Link
      >
    </div>
  </div>
</section>

<section class="gallery">
  <div class="container">
    <h2>{he.decode(acf.titre_equipe_poly)}</h2>
    <div class="texte">
      {@html acf.texte_equie_poly}
    </div>
    <div class="gallery-container">
      {#each acf.gallerie_dimage as picture}
        {#if picture.image_webp}
          <img
            src={imageFormatter(
              { webP: picture.image_webp.url, old: picture.image.url },
              webpSupported
            )}
            alt={picture.image.alt}
            title={picture.image.title}
          />
        {:else}
          <img
            src={picture.image.url}
            alt={picture.image.alt}
            title={picture.image.title}
          />
        {/if}
      {/each}
    </div>
  </div>
</section>

<style lang="scss">
  .gallery {
    margin-bottom: 9.7rem;

    h2 {
      color: var(--color-vert-deau);
      text-transform: uppercase;
      font-size: 2.4rem;
      font-weight: 500;
      text-align: center;
      margin-bottom: 3.6rem;

      @media (min-width: 768px) {
        font-size: 2.8rem;
      }

      @media (min-width: 1330px) {
        font-size: 3.2rem;
      }
    }

    .texte {
      color: var(--color-vert-deau);
      font-size: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1em;
      margin-bottom: 6.9rem;
    }

    .gallery-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      row-gap: 4.2rem;
      column-gap: 4.4rem;

      @media (min-width: 1600px) {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        place-items: center;
      }
    }
  }
  .contact-us {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    :global(a) {
      color: white;
      background: var(--color-jaune);
      font-size: 2.4rem;
      font-weight: 500;
      text-decoration: none;
      border: 1px solid var(--color-jaune);
      padding: 3rem;
      border-radius: 4rem;
      margin-top: 4.5rem;
      line-height: 1;
      transition: 0.3s;

      &:hover {
        color: var(--color-jaune);
        background: transparent;
      }
    }
  }
  .agence-section {
    margin-bottom: 4.4rem;

    .txt {
      color: var(--color-vert-deau);
      margin-top: 2.4rem;
      font-weight: 500;

      :global(a) {
        color: var(--color-vert-deau);
        font-weight: 500;
        text-decoration: underline;
      }

      @media (min-width: 1330px) {
        font-size: 2rem;
      }
    }

    .agences-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 4rem;

      @media (min-width: 768px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        justify-items: center;
        align-items: start;
        gap: 2rem;
      }
    }

    .agence {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;

      @media (min-width: 1330px) {
        height: 100%;
        justify-content: start;
      }
    }

    h3 {
      color: var(--color-jaune);
      text-align: center;
      font-size: 4.6rem;
      line-height: 1.3;

      @media (min-width: 1330px) {
        font-size: 5.6rem;
      }
    }
  }

  .bordered-container {
    border: 1px solid var(--color-jaune);
    padding-block: 5.1rem 6.2rem;
    border-top-left-radius: 20px;
    border-bottom-right-radius: 20px;
    color: var(--color-gris);
    padding-inline: 1.5em;
    margin-top: 2rem;
    width: 100%;

    @media (min-width: 1330px) {
      font-size: 2rem;
      height: 100%;
    }

    :global(strong) {
      margin-bottom: -1em;
      display: flow-root;
    }

    :global(p) {
      margin-bottom: 1.5em;
    }
  }

  small {
    color: var(--color-gris);
    text-align: center;

    @media (min-width: 1330px) {
      font-size: 2rem;
    }
  }

  .pin {
    width: 38px;
  }

  .equipe-orga {
    margin-top: 4rem;
    margin-bottom: 6.3rem;

    :global(h2) {
      font-size: calc(26px + (32 - 26) * ((100vw - 320px) / (1920 - 320)));
      text-transform: uppercase;
      line-height: 1.3;
      font-weight: 500;
      color: var(--color-gris);
      display: grid;
      grid-template-columns: 57px 1fr;
      align-items: center;
      justify-items: center;
      margin-inline: auto;
      width: fit-content;
      gap: 1rem;

      @media (min-width: 768px) {
        margin-bottom: 5.3rem;
      }

      @media (min-width: 1330px) {
        grid-template-columns: 77px 1fr;
      }

      &::before {
        content: "";
        background: url("/signature-thema-environnement.svg") no-repeat;
        width: 100%;
        height: 48px;
        align-self: center;

        @media (min-width: 1330px) {
          height: 64.99px;
        }
      }
    }

    .organigramme {
      margin-top: 4rem;
      background: var(--color-jaune);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-block: 4rem 4rem;
      text-align: center;
      color: var(--color-gris);
      line-height: 1.3;
      gap: 3.1rem;
      border-top-left-radius: 20px;
      border-bottom-right-radius: 20px;
      max-width: 461px;
      margin-inline: auto;
    }

    strong {
      font-size: 4rem;

      @media (min-width: 1330px) {
        font-size: 5rem;
      }
    }

    p {
      @media (min-width: 1330px) {
        font-size: 2rem;
      }
    }
  }

  .equipe {
    background: var(--color-linear-gradient);
    padding-block: 5rem 4rem;

    .container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    p {
      font-weight: 500;
    }

    h3,
    p {
      font-size: 2rem;
      text-align: center;
      color: white;
    }

    .members {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 3rem;

      @media (min-width: 768px) {
        gap: 4.8rem;
      }

      @media (min-width: 1600px) {
        gap: 11.6rem;
      }

      img {
        border-radius: 50%;
        margin-bottom: 1.4rem;
      }
    }

    :global(h2) {
      font-size: calc(26px + (32 - 26) * ((100vw - 320px) / (1920 - 320)));
      text-transform: uppercase;
      line-height: 1.3;
      font-weight: 500;
      color: white;
      margin-bottom: 2rem;
      display: grid;
      grid-template-columns: 57px 1fr;
      align-items: center;
      justify-items: center;
      margin-inline: auto;
      width: fit-content;
      max-width: 80%;
      gap: 1rem;

      @media (min-width: 768px) {
        margin-bottom: 5.3rem;
      }

      @media (min-width: 1330px) {
        grid-template-columns: 77px 1fr;
      }

      &::before {
        content: "";
        background: url("/signature-thema-environnement-blanc.svg") no-repeat;
        width: 100%;
        height: 48px;
        align-self: center;

        @media (min-width: 1330px) {
          height: 64.99px;
        }
      }
    }
  }

  .hero-banner {
    .texte {
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
      margin-top: 5.4rem;
      margin-bottom: 4.6rem;

      @media (min-width: 1330px) {
        margin-top: 8rem;
        margin-bottom: 6.9rem;
      }

      :global(h2) {
        font-size: calc(26px + (32 - 26) * ((100vw - 320px) / (1920 - 320)));
        text-align: center;
        text-transform: uppercase;
        line-height: 1.3;
      }

      :global(p) {
        @media (min-width: 1330px) {
          font-size: 2rem;
        }
      }
    }

    .title-container {
      display: flex;
      flex-direction: column;
      gap: 1em;
      background: var(--color-linear-gradient);
      color: white;
      border-top-left-radius: 20px;
      border-bottom-right-radius: 20px;
      padding-bottom: 2em;
      position: relative;

      @media (min-width: 768px) {
        background: transparent;
        min-height: 353px;
        justify-content: center;
        align-items: center;
        padding-inline: 3.7rem;
      }
    }

    h1 {
      padding-inline: 1rem;
      display: flex;
      flex-direction: column;
      line-height: 1.3;
      gap: 1rem;

      @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 77.5px 1fr;
        place-items: center;
        padding-inline: 0;
      }

      &::before {
        content: "";
        background: url("/signature-thema-environnement-blanc.svg") no-repeat;
        width: 77.5px;
        height: 65px;
        align-self: center;
      }
    }

    img {
      border-top-left-radius: 20px;
      border-bottom-right-radius: 20px;

      @media (min-width: 768px) {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        object-fit: cover;
        z-index: -1;
      }
    }
  }
</style>
