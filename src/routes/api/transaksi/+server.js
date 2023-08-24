import { redis } from "$lib/server/redis";
import {PATH_API,ID_AGEN} from "$env/static/private"

export const POST = async({request}) => {
    const path_api = PATH_API+"api/transaksidepowdsave"
    const object =  await request.json();
    const cached = await redis.get(ID_AGEN+"-token")
    let token = "";

    if(cached){
        const temp_cached = JSON.parse(cached)
        token = temp_cached.token
    }

    const resdata = await fetch(path_api, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token,
        },
        body: JSON.stringify({
            "page": "TRANSAKSI",
            "sdata": "New",
            "transdpwd_tipedoc": object.tipedoc,
            "transdpwd_bank_in": object.bank_in,
            "transdpwd_bank_out": object.bank_out,
            "transdpwd_amount": object.amount,
            "transdpwd_ipaddress": object.ipaddress,
            "transdpwd_timezone": object.timezone,
            "transdpwd_note": object.note,
        }),
    });
    const jsondata = await resdata.json();
    console.log(jsondata)
    return new Response(JSON.stringify(jsondata),{
        headers:{
            "Content-Type":"application.json"
        },
    });
}