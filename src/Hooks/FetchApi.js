export default async function FetchApi(url, params, method){
    try{
        const response = await fetch(url, {
           method,
           headers:{'content-type': 'application/json'},
           body: JSON.stringify(params)
        })
        const data = await response.json();
        return data;

    }catch(error){
        return error.message
    }
}

export async function getData(url){
    try{
        const response = await fetch(url,{
           method:'GET',
           headers:{'content-type': 'application/json'},
        })
        const data = await response.json();
        return data;

    }catch(error){
        return error.message
    }
}









 