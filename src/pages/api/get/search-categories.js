import { withAuth } from "../middlewares";

const searchCategories = async(req, res) => {
    const session = req.user
    
    const response = await fetch(process.env.API_URL + `categories/search-categories?id=${session.shop.id}&page=${req.query.page}&term=${req.query.term}`, {
      method: 'GET',
      headers: {'content-type': 'application/json', 'Ocp-Apim-Subscription-Key': process.env.ACCESS_TOKEN}
    });
    const categories = await response.json()
  
    res.status(200).json(categories);
  };
  
  export default withAuth(searchCategories);