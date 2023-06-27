import { withAuth } from "../middlewares";

const searchProducts = async(req, res) => {
    const session = req.user
    
    const response = await fetch(process.env.API_URL + `products/search-products?id=${session.shop.id}&page=${req.query.page}&term=${req.query.term}`, {
      method: 'GET',
      headers: {'content-type': 'application/json', 'Ocp-Apim-Subscription-Key': process.env.ACCESS_TOKEN}
    });
    const products = await response.json()
    res.status(200).json(products);
  };
  
  export default withAuth(searchProducts);