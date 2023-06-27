import { withAuth } from "../middlewares";

const getClients = async(req, res) => {
    const session = req.user

    //const data = req.body;
    
    const response = await fetch(process.env.API_URL + `clients/get-clients?id=${session.shop.id}&page=${req.query.page}`, {
      method: 'GET',
      headers: {'content-type': 'application/json', 'Ocp-Apim-Subscription-Key': process.env.ACCESS_TOKEN},
    });
    const clients = await response.json()
  
    res.status(200).json(clients);
  };
  
  export default withAuth(getClients);