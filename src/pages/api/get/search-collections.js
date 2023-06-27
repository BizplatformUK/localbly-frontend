import { withAuth } from "../middlewares";

const searchCollections = async(req, res) => {
    const session = req.user
    
    const response = await fetch(process.env.API_URL + `collections/search-collections?id=${session.shop.id}&page=${req.query.page}&term=${req.query.term}`, {
      method: 'GET',
      headers: {'content-type': 'application/json', 'Ocp-Apim-Subscription-Key': process.env.ACCESS_TOKEN},
    });
    const categories = await response.json()
    res.status(200).json(categories);
  };
  
  export default withAuth(searchCollections);