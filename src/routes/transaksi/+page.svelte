<script>
    import Seo from "$lib/Seo.svelte";

    export let data;
    const {list_transaksi, path, token} = data;
    if(token == ""){
        window.location.href = "/";
    }
    let listbankmember = list_transaksi.listbankmember!=null?list_transaksi.listbankmember:[];
    let listbankagen = list_transaksi.listbankagen!=null?list_transaksi.listbankagen:[];
    let deposit_idbanksumber_field = "";
    let deposit_idbanktujuan_field = "";
    let deposit_amount_field = 0;
    let deposit_note_field = "";
    function clearfield(){
        deposit_idbanksumber_field = "";
        deposit_idbanktujuan_field = "";
        deposit_amount_field = 0;
        deposit_note_field = "";
    }
    async function handleSaveTransaksi(tipe) {
        let flag = true
        let msg = ""
        if(tipe == "DEPOSIT"){
            if(deposit_idbanksumber_field == ""){
                flag = false
                msg += "Rekening Bank wajib diisi\n"
            }
            if(deposit_idbanktujuan_field == ""){
                flag = false
                msg += "Tujuan Transfer wajib diisi\n"
            }
            if(parseInt(deposit_amount_field) < 10000){
                flag = false
                msg += "Minimal Deposit 10.000\n"
            }
        }else{
          
            if(deposit_idbanktujuan_field == ""){
                flag = false
                msg += "Tujuan Transfer wajib diisi\n"
            }
            if(parseInt(deposit_amount_field) < 10000){
                flag = false
                msg += "Minimal Deposit 10.000\n"
            }
        }
        if(flag){
            const res = await fetch("/api/transaksi", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tipedoc: tipe,
                    bank_out: parseInt(deposit_idbanksumber_field),
                    bank_in: parseInt(deposit_idbanktujuan_field),
                    amount: parseInt(deposit_amount_field),
                    ipaddress: "123.123.123.123",
                    timezone: "Asia/Jakarta",
                    note: deposit_note_field,
                }),
            });
            const json = await res.json();
            if (json.status == 200) {
                clearfield()
                // window.location.href = path+"/transaksi";
            }
        }else{
            alert(msg)
        }
    }
    const handleKeyboard_number = (e) => {
        if (isNaN(parseInt(e.target.value))) {
            return e.target.value = 0;
        }else{
            return e.target.value = parseInt(e.target.value);
        }
	}
</script>
<Seo 
    title="SDSB4D Togel,Casino,Slot" 
    descp="" 
    url=""
    type="Website" />
<div class="container" style="margin-top: 10px;">
    <h1>Transaksi</h1>
    <center>
        <ul class="nav nav-pills justify-content-center" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" data-bs-toggle="tab" href="#deposit" aria-selected="true" role="tab">Deposit</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#withdraw" aria-selected="false" tabindex="-1" role="tab">Withdraw</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#transaksi" aria-selected="false" tabindex="-1" role="tab">Transaksi Terakhir</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-bs-toggle="tab" href="#akun" aria-selected="false" tabindex="-1" role="tab">Info Akun</a>
            </li>
        </ul>
        <div id="myTabContent" class="tab-content" style="margin-top: 10px;">
            <div class="tab-pane fade show active" id="deposit" role="tabpanel">
                <div class="col-sm-3">
                    <div class="form-floating mb-2">
                        <input type="text" class="form-control" id="floatingInput" placeholder="Nama Lengkap">
                        <label for="floatingInput">Nama Lengkap</label>
                    </div>
                    <div class="form-floating mb-2">
                        <select 
                            bind:value={deposit_idbanksumber_field}
                            class="form-select" aria-label="Default select example">
                            {#each listbankmember as rec}
                            <option value="{rec.memberbank_id}">{rec.memberbank_idbanktype}-{rec.memberbank_norek}-{rec.memberbank_nmownerbank}</option>
                            {/each}
                        </select>
                        <label for="floatingInput">Rekening Bank</label>
                    </div>
                    <div class="form-floating mb-2">
                        <input 
                            on:keyup={handleKeyboard_number} 
                            bind:value={deposit_amount_field}
                            type="text" class="form-control" id="floatingInput" style="text-align: right;" placeholder="Jumlah Transfer">
                        <label for="floatingInput">Jumlah Transfer</label>
                    </div>
                    <div class="form-floating mb-2">
                        <select 
                            bind:value={deposit_idbanktujuan_field}
                            class="form-select" aria-label="Default select example">
                            {#each listbankagen as rec}
                            <option value="{rec.agenbank_id}">{rec.agenbank_info}</option>
                            {/each}
                        </select>
                        <label for="floatingInput">Tujuan Transfer</label>
                    </div>
                    <div class="form-floating mb-2">
                        <textarea 
                            bind:value={deposit_note_field}
                            class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        <label for="floatingInput">Catatan Tambahan</label>
                    </div>
                    <div class="d-grid">
                    <button 
                        on:click={() => {
                            handleSaveTransaksi("DEPOSIT");
                        }} 
                        type="button" class="btn btn-warning ">KONFIRMASI</button>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="withdraw" role="tabpanel">
                <div class="col-sm-3">
                    <div class="form-floating mb-2">
                        <input type="text" class="form-control" id="floatingInput" placeholder="Nama Lengkap">
                        <label for="floatingInput">Nama Lengkap</label>
                    </div>
                    <div class="form-floating mb-2">
                        <select 
                            bind:value={deposit_idbanktujuan_field}
                            class="form-select" aria-label="Default select example">
                            {#each listbankmember as rec}
                            <option value="{rec.memberbank_id}">{rec.memberbank_idbanktype}-{rec.memberbank_norek}-{rec.memberbank_nmownerbank}</option>
                            {/each}
                        </select>
                        <label for="floatingInput">Rekening Bank</label>
                    </div>
                    <div class="form-floating mb-2">
                        <input 
                            on:keyup={handleKeyboard_number} 
                            bind:value={deposit_amount_field}
                            type="text" class="form-control" id="floatingInput" style="text-align: right;" placeholder="Jumlah Transfer">
                        <label for="floatingInput">Jumlah Transfer</label>
                    </div>
                    <div class="d-grid">
                        <button 
                            on:click={() => {
                                handleSaveTransaksi("WITHDRAW");
                            }} 
                            type="button" class="btn btn-warning ">KONFIRMASI</button>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="transaksi">
                <p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork.</p>
            </div>
            <div class="tab-pane fade" id="akun">
                <p>Trust fund seitan letterpress, keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater. Fanny pack portland seitan DIY, art party locavore wolf cliche high life echo park Austin. Cred vinyl keffiyeh DIY salvia PBR, banh mi before they sold out farm-to-table VHS viral locavore cosby sweater.</p>
            </div>
        </div>
    </center>
</div>