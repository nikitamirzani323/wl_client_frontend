<script>
    import Navbar from "$lib/Navbar.svelte";

    export let data;
    const {token} = data;
</script>
<Navbar data_token={token} />
<slot />