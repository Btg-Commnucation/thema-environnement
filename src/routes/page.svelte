<script context="module" lang="ts">
  export const preload = ({ params }: { params: { slug: string } }) => {
    return { slug: params.slug };
  };
</script>

<script lang="ts">
  export let slug: string;
  import ColumnPage from "@/components/ColumnPage.svelte";
  import Contact from "@/components/Contact.svelte";
  import Domaines from "@/components/Domaines.svelte";
  import Equipe from "@/components/Equipe.svelte";
  import Error from "@/components/Error.svelte";
  import Legals from "@/components/Legals.svelte";
  import Recrutement from "@/components/Recrutement.svelte";
  import Loading from "lib/Loading.svelte";
  import type { ColumnPageType } from "middleware/ColumnPageType";
  import type { PageType } from "middleware/page";
  import axios from "axios";
  import type { DomaineType } from "middleware/domaineType";
  import type { EquipeType } from "middleware/EquipeType";
  import type { ContactType } from "middleware/ContactType";
  import type { RecrutementType } from "middleware/RecrutementType";
  import { showMenu, showSubMenu } from "@/stores/menuHandle";
  import type { EntrepriseType } from "@/middleware/EntrepriseType";
  import Enteprise from "@/components/Enteprise.svelte";
  import { get } from "svelte/store";

  let pageData: PageType<
    | ColumnPageType
    | DomaineType
    | EquipeType
    | ContactType
    | RecrutementType
    | EntrepriseType
    | { type_de_page: "Style mentions légales" }
  > | null = null;

  function isLegals(
    data: PageType<
      | ColumnPageType
      | DomaineType
      | EquipeType
      | ContactType
      | RecrutementType
      | EntrepriseType
      | { type_de_page: "Style mentions légales" }
    >
  ): data is PageType<{ type_de_page: "Style mentions légales" }> {
    return data.acf?.type_de_page === "Style mentions légales";
  }

  function isContact(
    data: PageType<
      | ColumnPageType
      | DomaineType
      | EquipeType
      | ContactType
      | RecrutementType
      | EntrepriseType
      | { type_de_page: "Style mentions légales" }
    >
  ): data is PageType<ContactType> {
    return data.acf.type_de_page === "Contact";
  }

  function isColumnPage(
    data: PageType<
      | ColumnPageType
      | DomaineType
      | EquipeType
      | ContactType
      | RecrutementType
      | EntrepriseType
      | { type_de_page: "Style mentions légales" }
    >
  ): data is PageType<ColumnPageType> {
    return data.acf.type_de_page === "Style Compétences et prestations";
  }

  function isEquipePage(
    data: PageType<
      | ColumnPageType
      | DomaineType
      | EquipeType
      | ContactType
      | RecrutementType
      | EntrepriseType
      | { type_de_page: "Style mentions légales" }
    >
  ): data is PageType<EquipeType> {
    return data.acf.type_de_page === "Style équipe";
  }

  function isEntrepriseTyep(
    data: PageType<
      | ColumnPageType
      | DomaineType
      | EquipeType
      | ContactType
      | RecrutementType
      | EntrepriseType
      | { type_de_page: "Style mentions légales" }
    >
  ): data is PageType<EntrepriseType> {
    return data.acf.type_de_page === "Style entreprise et valeurs";
  }

  function isRecrutementPage(
    data: PageType<
      | ColumnPageType
      | DomaineType
      | EquipeType
      | ContactType
      | RecrutementType
      | EntrepriseType
      | { type_de_page: "Style mentions légales" }
    >
  ): data is PageType<RecrutementType> {
    return data.acf.type_de_page === "Style recrutement";
  }

  function isDomainePage(
    data: PageType<
      | ColumnPageType
      | DomaineType
      | EquipeType
      | ContactType
      | RecrutementType
      | EntrepriseType
      | { type_de_page: "Style mentions légales" }
    >
  ): data is PageType<DomaineType> {
    return data.acf.type_de_page === "Style domaines d'intervention";
  }

  const getPage = async (slug: string) => {
    showMenu.set(false);
    const subMenu: NodeListOf<HTMLElement> | null =
      document.querySelectorAll(".sub-menu");
    subMenu?.forEach((item: HTMLElement) => {
      item.classList.remove("active");
    });
    showSubMenu.update((n) => (n = false));

    const response = await axios({
      method: "GET",
      url: `${URL_API}/better-rest-endpoints/v1/page/${slug}`,
    });
    const data: PageType<
      | ColumnPageType
      | DomaineType
      | EquipeType
      | ContactType
      | RecrutementType
      | EntrepriseType
      | { type_de_page: "Style mentions légales" }
    > = await response.data;

    return data;
  };

  const setData = async () => {
    const pageData = await getPage(slug);

    return pageData;
  };

  const URL_API = import.meta.env.VITE_URL_API;
</script>

{#key slug}
  {#await setData()}
    <Loading />
  {:then item}
    {#if isLegals(item)}
      <Legals data={item} />
    {:else if !item.title}
      <Error error="404" />
    {:else if isContact(item)}
      <Contact data={item} />
    {:else if isColumnPage(item)}
      <ColumnPage data={item} />
    {:else if isEquipePage(item)}
      <Equipe data={item} />
    {:else if isRecrutementPage(item)}
      <Recrutement data={item} />
    {:else if isDomainePage(item)}
      <Domaines data={item} />
    {:else if isEntrepriseTyep(item)}
      <Enteprise data={item} />
    {/if}
  {:catch error}
    <h1>Une erreur est survenue</h1>
    <p>Veuillez réessayer plus tard</p>
  {/await}
{/key}
