import { withAuth } from "../middlewares";


const getShop = async(req, res) => {
    const session = req.user
    
    const response = await fetch(process.env.API_URL + `auth/get-single-shop/${session.id}`, {
      method: 'GET',
      headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${session.jwt}`, 
      'Ocp-Apim-Subscription-Key': process.env.ACCESS_TOKEN
    }
    });
    const shop = await response.json()
    if(response.status === 404){
      return false;
    }
    res.status(200).json(shop);
};
  
export default withAuth(getShop);