import { withAuth } from "../middlewares";

const getServices = async(req, res) => {
    const session = req.user
    //const data = req.body;
    
    const response = await fetch(process.env.API_URL + `services/get-services?id=${session.shop.id}&page=${req.query.page}`, {
      method: 'GET',
      headers: {'content-type': 'application/json', 'Ocp-Apim-Subscription-Key': process.env.ACCESS_TOKEN},
    });
    const data = await response.json()
    // Use the userId and sessionToken to make API requests
  
    res.status(200).json(data);
  };
  
  export default withAuth(getServices);