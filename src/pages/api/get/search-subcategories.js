import { withAuth } from "../middlewares";

const searchSubCategory = async(req, res) => {
    const session = req.user
    
    const response = await fetch(process.env.API_URL + `subcategories/search-subcategories?id=${session.shop.id}&page=${req.query.page}&term=${req.query.term}`, {
      method: 'GET',
      headers: {'content-type': 'application/json', 'Ocp-Apim-Subscription-Key': process.env.ACCESS_TOKEN}
    });
    const subcategories = await response.json()
  
    res.status(200).json(subcategories);
  };
  
  export default withAuth(searchSubCategory);