import { withAuth } from "../middlewares";

const getBanner = async(req, res) => {
    const session = req.user
      try{

      //const data = req.body;
      
      const response = await fetch(process.env.API_URL + `auth/fetch-shop-banner?id=${session.shop.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': process.env.ACCESS_TOKEN
        }
        
      });
      const items = await response.json()
    
      res.status(200).json(items);
    }catch(error){
      res.status(500).json({err:error});
    }
  };
  
  export default withAuth(getBanner);