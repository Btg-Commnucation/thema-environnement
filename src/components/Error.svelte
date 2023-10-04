<script>
  // @ts-nocheck

  export let error;
  import { webpSupported, checkWebpSupport } from "stores/webpSupported";
  import ThemaImg from "/header-faune-thema-environnement.jpg";
  import ThemaWebP from "/header-faune-thema-environnement.webp";
  import { imageFormatter } from "stores/imageFormatter";
  import { Link } from "svelte-routing";

  checkWebpSupport();
</script>

<svelte:head>
  <title>Erreur {error}</title>
  <meta
    name="description"
    content={`Erreur ${error}, merci de réessayer ultèrieusement`}
  />
</svelte:head>

<article>
  <div class="container">
    <img
      src={imageFormatter({ webP: ThemaWebP, old: ThemaImg }, webpSupported)}
      alt="Une erreur c'est produite"
      class="background"
    />
    <img
      src="/signature-thema-environnement-blanc.svg"
      alt="Logo de Thema environnement"
    />
    <h1>{`Erreur ${error}`}</h1>
    <p>La page quevous recherchez ne semble pas exister.</p>
    <Link to="/" class="white-link">Retour à la page d'accueil</Link>
  </div>
</article>

<style>
  article {
    margin-block: 4.3rem 8.8rem;
  }

  .container {
    position: relative;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding-block: 13.5rem 8.3rem;
  }

  p {
    text-decoration: none;
    font-size: 2.4rem;
    font-weight: 500;
    color: white;
  }

  h1 {
    margin-block: 4.2rem;
  }

  img:not(.background) {
    width: 94px;
    height: 78.78px;
  }

  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: cover;
    object-position: center;
    z-index: -1;
  }
</style>
