import { error } from '@sveltejs/kit';
import { redis } from "$lib/server/redis";
import {PATH_API,ID_AGEN} from "$env/static/private"

export const load = async({url,parent}) => {
    // const PATH_API = "http://128.199.241.112:5058/"
    const PATH = url.origin
    const seo_url = url.href
    const cached = await redis.get(ID_AGEN+"-token")
    let token = "";
   
    if(cached){
        const temp_cached = JSON.parse(cached)
        token = temp_cached.token
    }
    

    let {list_transaksi} = await loadData (PATH_API,PATH,token);
    // console.log(list_transaksi)
    
    return {
        list_transaksi : list_transaksi,
        path : PATH,
        token : token,
    }
}
async function loadData(path_api,path_host,auth_bearer){
    const cached_listtransaksi = await redis.get("LISTRANSAKSI")
    if(cached_listtransaksi){
        console.log("CACHE TRANSAKSI")
        const temp_data_listtransaksi_cached = JSON.parse(cached_listtransaksi)
        return {
            list_transaksi : temp_data_listtransaksi_cached,
        }
    }else{
        console.log("SERVER LISTTRANSAKSI")
        const [res_listtransaksi] = await Promise.all([
            fetch(path_api+"api/transaksidepowd", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+auth_bearer,
                },
                body: JSON.stringify({
                    "client_hostname": path_host,
                }),
            }),
        ]);
        const record_listtransaksi= await res_listtransaksi.json();

        redis.set("TRANSAKSI", JSON.stringify(record_listtransaksi), "EX",86400);
        return {
            list_transaksi : record_listtransaksi,
        }
    }

    
}