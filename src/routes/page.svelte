<script>
  export let slug;
  import ColumnPage from "@/components/ColumnPage.svelte";
  import Contact from "@/components/Contact.svelte";
  import Equipe from "@/components/Equipe.svelte";
  import Error from "@/components/Error.svelte";

  // @ts-nocheck

  import Legals from "@/components/Legals.svelte";
  import Recrutement from "@/components/Recrutement.svelte";
  import Loading from "@/lib/Loading.svelte";
  import axios from "axios";

  // @ts-ignore
  const getPage = async (slug) => {
    try {
      const response = await axios({
        method: "GET",
        url: `${URL_API}/better-rest-endpoints/v1/page/${slug}`,
      });
      return response.data;
    } catch (error) {
      console.log("Une erreur est survenue" + error);
    }
  };

  const URL_API = import.meta.env.VITE_URL_API;

  // @ts-ignore
  const data = getPage(slug);
</script>

{#await data}
  <Loading />
{:then item}
  {#if item.length === 0}
    <Error error="404" />
  {:else if item.acf.type_de_page === "Style mentions légales"}
    <Legals data={item} />
  {:else if item.acf.type_de_page === "Contact"}
    <Contact data={item} />
  {:else if item.acf.type_de_page === "Style Compétences et prestations"}
    <ColumnPage data={item} />
  {:else if item.acf.type_de_page === "Style équipe"}
    <Equipe data={item} />
  {:else if item.acf.type_de_page === "Style recrutement"}
    <Recrutement data={item} />
  {/if}
{:catch error}
  <h1>Une erreur est survenue</h1>
  <p>Veuillez réessayer plus tard</p>
{/await}
