import { withAuth } from "../middlewares";

const searchServices = async(req, res) => {
    const session = req.user
    
    const response = await fetch(process.env.API_URL + `services/search-services?id=${session.shop.id}&page=${req.query.page}&term=${req.query.term}`, {
      method: 'GET',
      headers: {'content-type': 'application/json', 'Ocp-Apim-Subscription-Key': process.env.ACCESS_TOKEN}
    });
    const services = await response.json()
    res.status(200).json(services);
  };
  
  export default withAuth(searchServices);