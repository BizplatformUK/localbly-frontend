import { getToken } from "next-auth/jwt"


export const withAuth = (handler)=> async(req,res)=> {
  const token = await getToken({ req })
  if(!token){
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  const {id, jwt} = token;
  let shop 

  const response = await fetch(process.env.API_URL + `auth/get-single-shop/${id}`, {
    method: 'GET',
      headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${jwt}`, 
      'Ocp-Apim-Subscription-Key': process.env.ACCESS_TOKEN
    }
  })
  const data = await response.json()
  shop = data;

  req.user={
    id,
    jwt,
    shop
  }
  return handler(req,res)
}
