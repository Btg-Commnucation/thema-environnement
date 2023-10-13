<script lang="ts">
  import type { PageType } from "middleware/page";
  import type { RecrutementType } from "middleware/RecrutementType";
  export let data: PageType<RecrutementType>;
  import he from "he";
  import RecrutementForm from "./RecrutementForm.svelte";

  const { acf } = data;
  const { yoast } = data;
</script>

<svelte:head>
  <title>{he.decode(data.title)}</title>
  <meta name="description" content={he.decode(yoast.yoast_wpseo_metadesc)} />
</svelte:head>

<section class="hero-banner">
  <div class="container">
    <h1>{he.decode(data.title)}</h1>
  </div>
  <div class="gradient-content">
    <div class="container">
      {#if acf.recurement_on__off === "Off"}
        <div class="texte-off">
          {@html acf.texte_recrutement_off}
        </div>
      {:else if acf.recurement_on__off === "On"}
        <div class="content-on">
          <h2>L'équipe Thema environnement recrute actuellement :</h2>
          {#if acf.liste_de_postes}
            <ul>
              {#each acf.liste_de_postes as poste}
                <li>
                  {he.decode(poste.poste)}
                  <a
                    href={poste.lien_de_telechargement.url}
                    target={poste.lien_de_telechargement.target}
                  >
                    {he.decode(poste.lien_de_telechargement.title)}
                  </a>
                </li>
              {/each}
            </ul>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</section>
<section class="form">
  <div class="container">
    <RecrutementForm />
  </div>
</section>

<style lang="scss">
  .hero-banner {
    margin-bottom: 4.2rem;
    margin-top: 2.1rem;

    @media (min-width: 1330px) {
      margin-top: 2.4rem;
    }
  }

  .content-on {
    width: 100%;
    h2 {
      font-weight: 500;
      text-transform: uppercase;
      margin-bottom: 4.6rem;
    }

    ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      font-weight: 500;
      gap: 3.2rem;
      width: 100%;

      @media (min-width: 768px) {
        align-items: start;
      }

      @media (min-width: 1330px) {
        font-size: 2rem;
      }

      a {
        color: white;
        text-decoration: underline;
        position: relative;

        &::before {
          content: "";
          background: url("/icone-telechargement.svg") no-repeat;
          width: 10.35px;
          height: 11.48px;
          position: absolute;
          left: -1.5em;
          top: 0;
          bottom: 0;
          margin-block: auto;
        }
      }
    }

    li {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1em;

      @media (min-width: 768px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        place-items: start;
        width: 100%;
      }

      &::before {
        content: "";
        position: absolute;
        left: -2em;
        top: 0.3em;
        background: var(--color-jaune);
        border-radius: 50%;
        width: 15px;
        height: 15px;
      }
    }
  }

  h1 {
    color: var(--color-vert-deau);
    line-height: 1.3;
    display: flex;
    flex-direction: column;
    gap: 1.7rem;

    &::before {
      content: "";
      background: url("/signature-thema-environnement-vert.svg") no-repeat;
      align-self: center;
      width: 57.87px;
      height: 48.49px;

      @media (min-width: 1330px) {
        width: 94px;
        height: 78.78px;
      }
    }

    @media (min-width: 768px) {
      flex-direction: row;
    }

    @media (min-width: 1330px) {
      gap: 5.5rem;
    }
  }

  .gradient-content {
    margin-top: 6.6rem;
    background: var(--color-linear-gradient);
    padding-block: 6.7rem 4rem;
    text-align: center;
    color: white;

    @media (min-width: 768px) {
      padding-block: 5.5rem 8.8rem;
    }

    @media (min-width: 768px) {
      padding-block: 8.6rem 5.2rem;
    }

    .texte-off {
      display: flex;
      flex-direction: column;
      gap: 2em;
      font-weight: 500;

      @media (min-width: 1330px) {
        font-size: 2rem;
      }
    }
  }
</style>
