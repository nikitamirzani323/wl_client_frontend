<script>
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
                    <a class="nav-link" href="#">Link</a>
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
        </div>
    </div>
</nav>
