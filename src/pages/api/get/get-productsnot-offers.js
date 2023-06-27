import { withAuth } from "../middlewares";

const getProducts = async(req, res) => {
    const session = req.user
    let url =  process.env.API_URL + `products/get-not-offers?id=${req.query.id}&shopid=${session.shop.id}&page=${req.query.page}`;
    //const data = req.body;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {'content-type': 'application/json', 'Ocp-Apim-Subscription-Key': process.env.ACCESS_TOKEN},
    });
    const products = await response.json()
  
    res.status(200).json(products);
};
  
  export default withAuth(getProducts);