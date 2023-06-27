import { withAuth } from "../middlewares";

const getCategories = async(req, res) => {
    const session = req.user
    //const data = req.body;
    let url =  req.query.filter === 'All' ? process.env.API_URL + `categories/get-categories?id=${session.shop.id}&page=${req.query.page}` :
      req.query.filter === 'Featured' ? process.env.API_URL + `categories/featured-shop-categories?id=${session.shop.id}&page=${req.query.page}` :
      req.query.filter === 'Standard' ? process.env.API_URL + `categories/unfeatured-shop-categories?id=${session.shop.id}&page=${req.query.page}` :
      process.env.API_URL + `categories/get-categories?id=${session.shop.id}&page=${req.query.page}`;


    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Ocp-Apim-Subscription-Key': process.env.ACCESS_TOKEN
      },
    });
    const categories = await response.json()
  
    res.status(200).json(categories);
  };
  
  export default withAuth(getCategories);