import { withAuth } from "../middlewares";

const getOfferProducts = async(req, res) => {
    const session = req.user
    
    let url =  process.env.API_URL +  `products/get-offer-products?id=${session.shop.id}&slug=${req.query.slug}&page=${req.query.page}` 
     
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {'content-type': 'application/json', 'Ocp-Apim-Subscription-Key': process.env.ACCESS_TOKEN},
    });
    const products = await response.json()
  
    res.status(200).json(products);
  };
  
  export default withAuth(getOfferProducts);