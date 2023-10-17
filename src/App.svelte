<script lang="ts">
  import { Router, Route, Link } from "svelte-routing";
  import axios from "axios";
  import Page from "./routes/page.svelte";
  import Loading from "./lib/Loading.svelte";
  import slugify from "slugify";
  import {
    showMenu,
    showSubMenu,
    toggleMenu,
    slugTitle,
  } from "stores/menuHandle";
  import Home from "./components/Home.svelte";
  export const url = "";

  const URL_API = import.meta.env.VITE_URL_API;

  const getFooterMenu = async () => {
    try {
      const response = await axios(
        `${URL_API}/better-rest-endpoints/v1/menus/menu-pied-de-page`
      ).then((res) => res);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const getOptionsPage = async () => {
    try {
      const response = await axios(
        `${URL_API}/better-rest-endpoints/v1/options/acf`
      ).then((res) => res);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getMenu = async () => {
    try {
      const response = await axios(
        `${URL_API}/better-rest-endpoints/v1/menus/menu-principal`
      ).then((res) => res);
      return response;
    } catch (error) {
      return {
        data: [
          {
            ID: 0,
            menu_order: 0,
            title: "Une erreur est survenue, merci de réessayer",
            url: "/",
            slug: "/",
            target: "",
            description: "",
            menu_item_parent: "",
          },
        ],
      };
    }
  };

  const handleClick = (e: MouseEvent) => {
    showSubMenu.update((n) => !n);
    const target = e.target as HTMLParagraphElement;
    const subMenu = document.querySelector(
      `.${slugTitle(target.textContent!)}`
    );
    toggleMenu(subMenu);
  };

  let data = getMenu();
  let footerMenu = getFooterMenu();
  let options = getOptionsPage();

  $: showMenu_class = $showMenu ? "showMenu_class" : "";
</script>

<Router {url}>
  <header>
    <div class="container">
      <Link to="/"
        ><img
          src="/logo-thema-envirronement.svg"
          alt="Thema environnement"
          class="logo"
        /></Link
      >
      <button
        aria-label="Ouvrir le menu"
        class="burger"
        on:click={() => showMenu.set(true)}
      >
        <span class="burger-line" />
        <span class="burger-line" />
        <span class="burger-line" />
      </button>
      <nav id="main-menu" class:showMenu_class>
        <button
          on:click={() => {
            showMenu.set(false);
          }}
          class="button-close-menu"
          aria-label="Fermer le menu"
        >
          <span class="screen-reader-text">Fermer le menu</span>
          <img
            src="/signature-thema-environnement-vert.svg"
            alt="Fermer le menu"
            class="close-menu"
          />
        </button>
        <ul>
          {#await data then items}
            {#each items.data as item}
              {#if item.menu_item_parent === "0"}
                <li>
                  {#if item.slug === "#"}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                    <p
                      on:click={(e) => handleClick(e)}
                      class={item.slug === "#" ? "dummy-link" : ""}
                    >
                      {item.title}
                    </p>
                  {:else}
                    <Link to={item.slug}>{item.title}</Link>
                  {/if}
                  {#if item.slug === "#"}
                    <ul class={`subMenu ${slugTitle(item.title)}`}>
                      {#each items.data as subItem}
                        {#if Number(subItem.menu_item_parent) === item.ID}
                          <li>
                            <Link to={subItem.slug}>{subItem.title}</Link>
                          </li>
                        {/if}
                      {/each}
                    </ul>
                  {/if}
                </li>
              {/if}
            {/each}
          {:catch error}
            <p>Une erreur c'est produit, veuillez réessayer</p>
          {/await}
        </ul>
        <div class="contact contact-mobile">
          <Link to="/nous-contacter" class="contact-link"
            ><img
              loading="lazy"
              src="/contact-thema.svg"
              alt="Nous contacter"
            /></Link
          >
        </div>
      </nav>
      <div class="contact contact-desktop">
        <Link to="/nous-contacter" class="contact-link"
          ><img
            loading="lazy"
            src="/contact-thema.svg"
            alt="Nous contacter"
          /></Link
        >
      </div>
    </div>
  </header>
  <main>
    <Route path="/"><Home /></Route>
    <Route path="/:slug" let:params><Page slug={params.slug} /></Route>
  </main>
  <footer>
    <div class="container">
      <img
        src="/signature-thema-environnement-blanc.svg"
        alt="Logo Thema environnement"
        class="logo-footer"
      />
      <section class="footer-elems">
        <div class="navigation">
          <strong>Navigation :</strong>
          {#await footerMenu then items}
            <ul class="main-elems">
              {#each items?.data as item}
                {#if item.menu_item_parent === "0"}
                  <li>
                    <Link to={item.slug}>{item.title}</Link>
                    <ul class="subMenu">
                      {#each items?.data as subItem}
                        {#if Number(subItem.menu_item_parent) === item.ID}
                          <li>
                            <Link to={subItem.slug}>{subItem.title}</Link>
                          </li>
                        {/if}
                      {/each}
                    </ul>
                  </li>
                {/if}
              {/each}
            </ul>
          {:catch error}
            <p>Une erreur c'est produit, veuillez réessayer</p>
          {/await}
        </div>
        {#await options then items}
          <address>
            <div class="middle">
              <strong>Agence centre - Siège social</strong>
              <div class="centre">{@html items.contenu_agence_centre}</div>
              <strong>Agence Ouest</strong>
              <div class="ouest">{@html items.contenu_agence_ouest}</div>
              <div class="rs">
                {#each items.liens as lien}
                  <a href={lien.lien.url} target={lien.lien.target}>
                    <img
                      src={lien.image.url}
                      alt={lien.image.alt}
                      title={lien.image.title}
                    />
                    {lien.lien.title}
                  </a>
                {/each}
              </div>
            </div>
          </address>
          <div class="right">
            <strong>Horaire d'ouverture</strong>
            <div>{@html items.horaires}</div>
          </div>
        {:catch error}
          <p>Une erreur c'est produit, veuillez réessayer</p>
        {/await}
      </section>
      <div class="mentions">
        <p>
          Site réalisé par : <a
            href="https://www.btg-communication.fr"
            rel="noopener noreferrer">btg communication</a
          >
        </p>
      </div>
    </div>
  </footer>
</Router>

<style lang="scss">
  header {
    background: white;
    padding-block: 1em;
    position: relative;

    :global(.dummy-link) {
      display: none;
      font-size: 1.6rem;

      @media (min-width: 1330px) {
        display: initial;
        transition: 0.3s ease-in-out;

        &:hover {
          color: var(--color-vert-deau);
        }
      }
    }

    .subMenu {
      @media (min-width: 1330px) {
        position: absolute;
        background: var(--color-vert-deau);
        color: white;
        padding-inline: 2rem;
        padding-block: 1rem;
        width: 100%;
        height: fit-content;
        transform: translateY(-300%);
        left: 0;
        top: 0;
        z-index: 500;
        display: flex;
        flex-direction: column !important;
        transition: 0.5s ease-in-out;

        :global(a) {
          color: white;

          &:hover {
            color: var(--color-jaune) !important;
          }
        }

        &.active {
          transform: translateY(15%);
        }
      }
    }
  }

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 95%;
    margin-inline: auto;

    @media (min-width: 1330px) {
      max-width: 85%;
    }

    @media (min-width: 1620px) {
      max-width: 66%;
    }
  }

  .logo {
    width: 125px;

    @media (min-width: 1330px) {
      width: 196px;
    }
  }

  .contact {
    background: var(--color-vert-deau);
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    &.contact-desktop {
      display: none;

      @media (min-width: 1330px) {
        display: flex;
      }
    }

    @media (min-width: 1330px) {
      &.contact-mobile {
        display: none;
      }
    }

    :global(a) {
      width: 31px;
      height: 22px;
    }

    img {
      width: 31px;
      height: 22px;
      margin-inline: auto;
    }
  }

  .burger {
    background: var(--color-vert-deau);
    width: 38px;
    height: 38px;
    border: none;
    border-radius: 50%;

    @media (min-width: 1330px) {
      display: none;
    }

    &-line {
      background: white;
      width: 21px;
      height: 2px;
      display: block;
      margin: 0.2em auto;
    }
  }

  #main-menu {
    background: white;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 5rem;
    transition: 0.5s ease-in-out;
    transform: translateY(-100%);
    z-index: 100;

    :global(a) {
      transition: 0.3s ease-in-out;

      &:hover {
        color: var(--color-vert-deau);
      }
    }

    p {
      cursor: pointer;
    }

    &.showMenu_class {
      transform: translateY(0);
    }

    @media (min-width: 1330px) {
      transform: translateY(0);
      position: initial;
      background: none;
      width: fit-content;
      height: fit-content;
      gap: 0;
      flex-direction: row;
      justify-content: space-between;
    }

    ul {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1em;

      @media (min-width: 1330px) {
        flex-direction: row;
      }
    }
  }

  .button-close-menu {
    background: transparent;
    border: none;
    width: fit-content;
    height: fit-content;

    @media (min-width: 1330px) {
      display: none;
    }
  }

  .close-menu {
    width: 48px;
    height: 48px;
    position: absolute;
    top: 1em;
    right: 1em;
    cursor: pointer;
  }

  footer {
    background: var(--color-linear-gradient);
    width: 100%;
    padding-block: 3.1rem 1.6rem;

    .container {
      flex-direction: column;
      gap: 6.2rem;
    }
  }

  .logo-footer {
    width: 77.5px;
    height: 65px;
    margin-inline: auto;
  }

  .footer-elems {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: start;
    align-items: center;

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
      place-items: start;
    }

    @media (min-width: 1330px) {
      grid-template-columns: repeat(3, 1fr);
    }

    strong {
      font-size: 2.4rem;
      font-weight: 700;
      color: white;
      margin-bottom: 1.4rem;
      display: flow-root;
    }
  }

  .main-elems {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.3em;
    margin-left: 1em;

    li::before {
      content: "-";
      margin-right: 0.4em;
      color: white;
      font-size: 1.6rem;
    }

    .subMenu {
      margin-left: 1em;
    }
  }

  address {
    margin-top: 8rem;
    color: white;
    font-weight: 500;

    @media (min-width: 768px) {
      margin-top: 0;
    }

    strong {
      margin-bottom: 1.3rem;
      display: flow-root;
      font-size: 1.8rem !important;

      &:not(:first-of-type) {
        margin-top: 4rem;
      }
    }

    .rs {
      margin-top: 3em;
      display: flex;
      flex-direction: column;
      gap: 0.5em;

      a {
        display: flex;
        justify-content: start;
        align-items: center;
        gap: 1.4rem;

        img {
          width: 100% !important;
          height: 100% !important;
          max-width: 29.46px;
          max-height: 29.46px;
          margin: 0 !important;
        }
      }
    }
  }

  .right {
    color: white;
    @media (min-width: 768px) {
      grid-column: 1;
      grid-row: 2;
    }

    @media (min-width: 1330px) {
      grid-column: 3;
      grid-row: 1;
    }

    strong {
      font-size: 2.4rem !important;
    }
    div {
      margin-left: 1em;
      display: flex;
      flex-direction: column;
      gap: 1em;
    }
  }

  .mentions {
    color: white;
    font-weight: 500;

    @media (min-width: 1330px) {
      align-self: end;
    }
  }
</style>
