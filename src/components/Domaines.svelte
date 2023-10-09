<script lang="ts">
  import type { PageType } from "middleware/page";
  import type { DomaineType } from "middleware/domaineType";
  export let data: PageType<DomaineType>;
  import he from "he";
  import { webpSupported, checkWebpSupport } from "stores/webpSupported";
  import { imageFormatter } from "stores/imageFormatter";
  import DomainesContent from "@/lib/DomainesContent.svelte";
  import PageHero from "@/lib/PageHero.svelte";

  checkWebpSupport();

  const { acf, yoast } = data;
</script>

<svelte:head>
  <title>{he.decode(data.title)}</title>
  <meta name="description" content={he.decode(yoast.yoast_wpseo_metadesc)} />
</svelte:head>

<PageHero
  title={data.title}
  content={data.content}
  image={acf.image_haut}
  imageWebp={acf.image_haut_webp ? acf.image_haut_webp : null}
/>
<section class="gradient-green">
  <DomainesContent
    titre={acf.titre_fond_vert}
    columns={acf.column_fond_vert}
    texte={acf.texte_fond_vert}
    imageTitre="signature-thema-environnement-blanc.svg"
    bulletColor="#fcbe00"
    borderColor="white"
  />
</section>
<section class="yellow">
  <DomainesContent
    titre={acf.titre_fond_jaune}
    columns={acf.column_fond_jaune}
    texte={acf.texte_fond_jaune}
    imageTitre="signature-thema-environnement-gray.svg"
    bulletColor="white"
    borderColor="white"
  />
</section>
<section class="white">
  <DomainesContent
    titre={acf.titre_fond_blanc}
    columns={acf.column_fond_blanc}
    texte={acf.texte_fond_blanc}
    imageTitre="signature-thema-environnement-vert-clair.svg"
    bulletColor="#44B389"
    borderColor="#44B389"
  />
</section>

<style lang="scss">
  section.gradient-green {
    background: var(--color-linear-gradient);
    color: white;
    padding-block: 5.5rem 3rem;

    :global(a) {
      color: white;
    }
  }

  section.yellow {
    background: var(--color-jaune);
    padding-block: 5.5rem 3rem;
  }

  section.white {
    padding-block: 5.5rem 3rem;
    color: var(--color-vert);

    :global(a) {
      color: var(--color-vert);
    }
  }
</style>
