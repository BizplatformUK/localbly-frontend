import { withAuth } from "../middlewares";

const searchOffers = async(req, res) => {
    const session = req.user
    
    const response = await fetch(process.env.API_URL + `offers/search-offers?id=${session.shop.id}&page=${req.query.page}&term=${req.query.term}`, {
      method: 'GET',
      headers: {'content-type': 'application/json', 'Ocp-Apim-Subscription-Key': process.env.ACCESS_TOKEN},
    });
    const collections = await response.json()
    res.status(200).json(collections);
  };
  
  export default withAuth(searchOffers);