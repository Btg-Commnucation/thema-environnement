<script>
  import { onMount } from "svelte";

  const hostname = window.location.hostname;

  const URL = `https://admin.${hostname}/wp-admin`;

  onMount(() => {
    window.location.href = URL;
  });
</script>
