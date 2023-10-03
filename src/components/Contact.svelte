<script>
  // @ts-nocheck
  export let data;
  import { webpSupported, checkWebpSupport } from "stores/webpSupported";
  import ThemaImg from "/header-nous-contacter.jpg";
  import ThemaWebP from "/header-nous-contacter.webp";
  import { imageFormatter } from "stores/imageFormatter";
  import FormFile from "./FormFile.svelte";

  checkWebpSupport();
</script>

<section class="hero-banner">
  <div class="container">
    <img
      src={imageFormatter({ webP: ThemaWebP, old: ThemaImg }, webpSupported)}
      alt="Un homme les pieds dans un lac"
    />
    <h1>{data.title}</h1>
  </div>
</section>

<!-- svelte-ignore a11y-label-has-associated-control -->
<section class="form">
  <div class="container">
    <h2>Formulaire de contact</h2>
    <FormFile />
  </div>
</section>

<section class="informations">
  <div class="container">
    {#each data.acf.position_agence as item}
      <div class={`position ${item.avec_pin === "Oui" ? "with-pin" : ""}`}>
        {#if item.avec_pin === "Oui"}
          <img
            src="/marker-thema.svg"
            alt="Pin de géolocalisation"
            class="pin"
          />
        {/if}
        <h3>{item.titre}</h3>
        {#if item.siege_social === "Oui"}
          <p class="siege">(siège social)</p>
        {/if}
        <div class="contenu">
          {@html item.texte}
        </div>
      </div>
    {/each}
  </div>
</section>

<style lang="scss">
  .informations {
    margin-bottom: 7.6rem;

    @media (min-width: 1330px) {
      margin-bottom: 20.5rem;
    }
    .container {
      display: flex;
      flex-direction: column;
      gap: 6rem;
      justify-content: center;
      align-items: center;

      @media (min-width: 768px) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 1.9rem;
        row-gap: 6.6rem;
        align-items: start;
        justify-items: center;

        .position {
          width: 100%;
        }

        .position:first-of-type {
          align-self: end;
        }

        .position:last-of-type {
          grid-column: 1 / 3;

          .contenu {
            width: 100%;
          }
        }
      }

      @media (min-width: 1330px) {
        align-items: start;

        .position {
          width: 100%;

          .contenu {
            width: 100%;
          }
        }

        .position:first-of-type {
          align-self: start;
        }

        .position:last-of-type {
          width: 50%;
        }
      }
    }

    .pin {
      width: 38px;
      height: 55.7px;
      margin-bottom: 0.5rem;
    }

    .siege {
      font-size: 2rem;
      font-weight: 500;
      line-height: 1;
    }
  }

  .position {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &.with-pin {
      :global(h3) {
        color: var(--color-jaune);
        font-size: calc(35px + (56 - 35) * ((100vw - 320px) / (1920 - 320)));
        font-weight: 700;
      }

      .contenu {
        border-color: var(--color-jaune);

        :global(p) {
          color: var(--color-jaune);
        }
      }
    }

    :global(h3) {
      font-size: 2.4rem;
      font-weight: 500;
      text-align: center;
      color: var(--color-vert-deau);
      line-height: 1;
    }

    .contenu {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      gap: 3.7rem;
      margin-top: 2.8rem;
      padding-block: 5.1rem;
      padding-inline: 2em;
      border: 1px solid var(--color-vert-deau);
      border-top-left-radius: 20px;
      border-bottom-right-radius: 20px;

      :global(strong) {
        font-size: 2rem;
        font-weight: 700;
        color: var(--color-gris);
        text-align: center;
      }

      :global(p) {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 1.3rem;
        font-size: 1.6rem;
        font-weight: 500;
        color: var(--color-vert-deau);
      }

      :global(img) {
        width: 2.3rem;
      }
    }
  }

  .form {
    margin-bottom: 8.5rem;
  }

  .hero-banner {
    margin-top: 5.4rem;
    margin-bottom: 8.5rem;

    .container {
      position: relative;
      //   padding-block: 14.9rem;
      border-top-left-radius: 20px;
      border-bottom-right-radius: 20px;
      background: linear-gradient(
        90deg,
        var(--color-vert) 0%,
        var(--color-vert-deau) 100%
      );
      gap: 2em;
      display: flex;
      flex-direction: column;
      justify-content: start;
      padding-bottom: 1.5em;

      @media (min-width: 768px) {
        padding-block: 14.9rem;
        background: transparent;
        gap: 0;
        justify-content: center;
        align-items: center;
      }
    }

    h1 {
      color: white;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 0.5em;
      text-align: center;
      line-height: 1.3;

      @media (min-width: 768px) {
        gap: 1em;
      }

      &::before {
        content: "";
        background: url("/signature-thema-environnement-blanc.svg") no-repeat
          center;
        width: 94px;
        height: 78px;
      }
    }

    img {
      width: 100%;
      height: 100%;
      min-height: 200px;
      object-fit: cover;
      border-top-left-radius: 20px;
      border-bottom-right-radius: 20px;

      @media (min-width: 768px) {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
      }
    }
  }

  h2 {
    font-size: 2.4rem;
    color: var(--color-vert-deau);
    text-align: center;
    font-weight: 500;
    margin-bottom: 5.4rem;
  }
</style>
