<script lang="ts">
  import { showMenu } from "stores/menuHandle";
  import { onMount } from "svelte";

  onMount(() => {
    showMenu.set(false);
  });
</script>

<main>
  <div class="container">
    <div class="pulse">
      <img
        src="/signature-thema-environnement-vert.svg"
        alt="Un petit instant, votre page se charge"
      />
      <div class="pulse-animation" />
    </div>
    <h1>Chargement ...</h1>
    <p>Notre site arrive</p>
  </div>
</main>

<style lang="scss">
  main {
    width: 100%;
    margin-block: 15rem;

    .container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
    }

    img {
      width: 150px;
    }
  }

  .pulse {
    position: relative;
    width: fit-content;
    height: fit-content;
    margin-bottom: 5rem;
  }

  h1,
  p {
    color: var(--color-gris);
  }

  .pulse-animation {
    position: absolute;
    z-index: -1;
    opacity: 0.2;
    border-radius: 50%;
    top: -85px;
    left: -75px;
    width: 300px;
    height: 300px;
    background: var(--color-linear-gradient);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.5);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
    }

    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }

    100% {
      transform: scale(0.5);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }
</style>
