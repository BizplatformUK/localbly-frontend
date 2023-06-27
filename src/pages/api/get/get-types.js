import { withAuth } from "../middlewares";

const getTypes = async(req, res) => {
    const response = await fetch(process.env.API_URL + `shops/fetch-types`, {
      method: 'GET',
      headers: {
      'content-type': 'application/json', 
      'Ocp-Apim-Subscription-Key': process.env.ACCESS_TOKEN
    }
    });
    const types = await response.json()
    // Use the userId and sessionToken to make API requests
  
    res.status(200).json(types);
  };
  
  export default getTypes;