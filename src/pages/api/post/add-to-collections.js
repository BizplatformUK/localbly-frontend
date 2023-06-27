import { withAuth } from "../middlewares";

const addToCollections = async(req, res) => {
    const session = req.user
    //const data = req.body;
    
    const response = await fetch(process.env.API_URL + `collections/add-to-collection/${session.shop.id}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${session.jwt}`,
        'Ocp-Apim-Subscription-Key': process.env.ACCESS_TOKEN
      },
      body: JSON.stringify(req.body)
    });
    const feedback = await response.json()
    // Use the userId and sessionToken to make API requests
  
    res.status(200).json(feedback);
  };
  
  export default withAuth(addToCollections);