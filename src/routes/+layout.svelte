<script>
    import Navbar from "$lib/Navbar.svelte";

    export let data;
    const {token} = data;
    console.log("token : "+token)
</script>
<Navbar data_token={token} />
<slot />