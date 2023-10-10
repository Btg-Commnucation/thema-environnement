<script lang="ts">
  import { showMenu } from "@/stores/menuHandle";
  import axios from "axios";
  import he from "he";
  import type { FrontPage } from "@/middleware/FrontPage";
  import Loading from "@/lib/Loading.svelte";
  import HomeLoaded from "./HomeLoaded.svelte";

  let data: FrontPage[];
  let homepageData: FrontPage;

  const getPage = async () => {
    showMenu.set(false);
    try {
      const response = await axios({
        method: "GET",
        url: `${URL_API}/better-rest-endpoints/v1/pages?per_page=50`,
      });
      data = await response.data;

      return data.find((item: any) => {
        const url = new URL(item.permalink);
        return url.pathname === "/";
      });
    } catch (e) {
      console.log(`Une erreur est survenue : ${e}`);
    }
  };

  const setData = async (): Promise<FrontPage | undefined> => {
    const pageData = await getPage();

    return pageData;
  };

  const URL_API = import.meta.env.VITE_URL_API;
</script>

{#await setData()}
  <Loading />
{:then item}
  {#if item}
    <HomeLoaded {item} />
  {/if}
{/await}
