import { withAuth } from "../middlewares";

const handler = async(req, res) => {
    const session = req.user
    //const data = req.body;
    
    const response = await fetch(process.env.API_URL + `products/delete-product/${session.shop.id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${session.jwt}`,
        'Ocp-Apim-Subscription-Key': process.env.ACCESS_TOKEN
      },
      body: JSON.stringify({prodId:req.query.id})
    });
    const feedback = await response.json()
    // Use the userId and sessionToken to make API requests
  
    res.status(200).json(feedback);
  };
  
  export default withAuth(handler);