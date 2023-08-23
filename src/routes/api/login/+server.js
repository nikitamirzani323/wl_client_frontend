import { redis } from "$lib/server/redis";
import {PATH_API,ID_AGEN} from "$env/static/private"

export const POST = async({request}) => {
    const path_api = PATH_API+"api/login"
    const object =  await request.json();
    const resdata = await fetch(path_api, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "idmasteragen": ID_AGEN,
            "username": object.username,
            "password": object.password,
            "ipaddress": "145.16.21.2",
            "timezone": "Asia/Jakarta",
        }),
    });
    const jsondata = await resdata.json();
    console.log(jsondata)
    console.log(path_api)
    redis.set(ID_AGEN+"-token", JSON.stringify(jsondata), "EX",86400);
    return new Response(JSON.stringify(jsondata),{
        headers:{
            "Content-Type":"application.json"
        },
    });
}