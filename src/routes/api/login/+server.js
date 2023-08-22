import {PATH_API} from "$env/static/private"

export const POST = async({request,url}) => {
    console.log(PATH_API)
    const path_api = PATH_API+"api/init"
    const object =  await request.json();
    const resdata = await fetch(path_api, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "client_hostname": url.host,
        }),
    });
    const jsondata = await resdata.json();
    console.log(jsondata)
    console.log(object.username)
    console.log(object.password)
    return new Response(JSON.stringify(jsondata),{
        headers:{
            "Content-Type":"application.json"
        },
    });
}