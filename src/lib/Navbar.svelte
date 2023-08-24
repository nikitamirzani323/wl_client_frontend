<script>
  import { redirect } from "@sveltejs/kit";

    
    export let data_token = "";
    let username = "";
    let password = "";
    
    async function call_login() {
        let flag = true
        let msg = ""
        if(username == ""){
            flag = false
            msg += "The Username is required\n"
        }
        if(password.length == 4){
            flag = false
            msg += "The Password is maxlengt 4\n"
        }
        
        if(flag){
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });
            const json = await res.json();
            if (json.status == 200) {
                console.log(json.token)
                window.location.href = "/";
            }
        }else{
            alert(msg)
        }
    }
</script>
<nav class="navbar bg-body-secondary navbar-expand-lg " >
    <div class="container">
        <a class="navbar-brand" href="#">
            <img
                width="70%" 
                src="https://sdsb4d.app/logo-green.svg" alt="" srcset="">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/transaksi">Transksi</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                </li>
            </ul>
            {#if data_token == ""}
                <form class="d-flex" role="search">
                    <input
                        bind:value={username} 
                        class="form-control form-control-sm me-1" 
                        type="text" placeholder="Username" aria-label="Username">
                    <input
                        bind:value={password} 
                        class="form-control form-control-sm me-1" type="password" placeholder="Password" aria-label="Password">
                    <button on:click={() => {
                            call_login();
                        }} class="btn btn-sm btn-primary me-1">Masuk</button>
                    <button class="btn btn-sm btn-primary">Daftar</button>
                </form>
            {:else}
                <div class="d-flex">
                    <div class="d-flex flex-column me-3">
                        <span>Joni</span>
                        <span>1.000.000</span>
                    </div>
                    <i style="cursor: pointer; align-self-center" class="bi bi-arrow-clockwise me-3"></i>
                    <div class="dropdown" style="cursor: pointer; align-self-center">
                        <span class="dropdown-toggle"  data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-person-circle"></i>
                        </span>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item" href="#">Profile</a></li>
                            <li><a class="dropdown-item" href="#">Laporan Transaksi</a></li>
                            <li><a class="dropdown-item" href="#">Referal</a></li>
                        </ul>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</nav>
