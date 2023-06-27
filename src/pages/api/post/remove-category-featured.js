import { withAuth } from "../middlewares";

const removeCategoryFeatured = async(req, res) => {
    const session = req.user
  
    
    const response = await fetch(process.env.API_URL + `categories/remove-from-featured?shopid=${session.shop.id}&catid=${req.query.id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${session.jwt}`,
        'Ocp-Apim-Subscription-Key': process.env.ACCESS_TOKEN
      },
     
    });
    const feedback = await response.json()
    // Use the userId and sessionToken to make API requests
  
    res.status(200).json(feedback);
  };
  
  export default withAuth(removeCategoryFeatured);