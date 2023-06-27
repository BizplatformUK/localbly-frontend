import { withAuth } from "../middlewares";

const getProducts = async(req, res) => {
    const session = req.user
    let url =  req.query.filter === 'All' ? process.env.API_URL + `products/get-shop-products?id=${session.shop.id}&page=${req.query.page}` :
    req.query.filter === 'Featured' ? process.env.API_URL + `products/get-featured-home-products?id=${session.shop.id}&page=${req.query.page}` :
    req.query.filter === 'Standard' ? process.env.API_URL + `products/get-standard-products?id=${session.shop.id}&page=${req.query.page}` :
    process.env.API_URL + `products/get-shop-products?id=${session.shop.id}&page=${req.query.page}`;
    //const data = req.body;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {'content-type': 'application/json', 'Ocp-Apim-Subscription-Key': process.env.ACCESS_TOKEN},
    });
    const products = await response.json()
  
    res.status(200).json(products);
};
  
  export default withAuth(getProducts);