import { withAuth } from "../middlewares";

const getOffers = async(req, res) => {
    const session = req.user
     
    let url = (!req.query.filter || req.query.filter === '' || req.query.filter === 'All') ? process.env.API_URL + `offers/get-offers?id=${session.shop.id}&page=${req.query.page}` :
      req.query.filter === 'Featured' ? process.env.API_URL + `offers/get-featured-offers?id=${session.shop.id}&page=${req.query.page}` :
      req.query.filter === 'Expired' ? process.env.API_URL + `offers/get-past-offers?id=${session.shop.id}&page=${req.query.page}` :
      (req.query.filter === 'OFFER' || req.query.filter === 'COUPON') ? process.env.API_URL + `offers/filter-offers?id=${session.shop.id}&page=${req.query.page}&type=${req.query.filter}` :
      null;
    //const data = req.body;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {'content-type': 'application/json', 
      'Ocp-Apim-Subscription-Key': process.env.ACCESS_TOKEN
      },
    });
    const offers = await response.json()
  
    res.status(200).json(offers);
  };
  
  export default withAuth(getOffers);