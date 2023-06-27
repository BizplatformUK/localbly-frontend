import { withAuth } from "../middlewares";

const getCatSubcategories = async(req, res) => {
    const session = req.user
    //const data = req.body;
    
    const response = await fetch(process.env.API_URL + `subcategories/get-cat-subcategories?id=${session.shop.id}&page=${req.query.page}&catId=${req.query.id}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Ocp-Apim-Subscription-Key': process.env.ACCESS_TOKEN
      }
    });
    const subcategories = await response.json()
    // Use the userId and sessionToken to make API requests
  
    res.status(200).json(subcategories);
  };
  
  export default withAuth(getCatSubcategories);