import { withAuth } from "../middlewares";

const getCollections = async(req, res) => {
    const session = req.user
    
    let url =  req.query.filter === 'All' ? process.env.API_URL +  `collections/get-collections?id=${session.shop.id}&page=${req.query.page}` :
      req.query.filter === 'Featured' ? process.env.API_URL + `collections/get-featured-collections?id=${session.shop.id}&page=${req.query.page}` :
      req.query.filter === 'Standard' ? process.env.API_URL + `collections/get-unfeatured-collections?id=${session.shop.id}&page=${req.query.page}` :
      null;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {'content-type': 'application/json', 'Ocp-Apim-Subscription-Key': process.env.ACCESS_TOKEN},
    });
    const collections = await response.json()
  
    res.status(200).json(collections);
  };
  
  export default withAuth(getCollections);