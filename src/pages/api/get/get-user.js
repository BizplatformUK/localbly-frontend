import { withAuth } from "../middlewares";

const getUser = async(req, res) => {
    const session = req.user
    
    const response = await fetch(process.env.API_URL + `auth/fetch-user/${session.id}`, {
      method: 'GET',
      headers: {'content-type': 'application/json', 'Ocp-Apim-Subscription-Key': process.env.ACCESS_TOKEN}
    });
    const user = await response.json()
    // Use the userId and sessionToken to make API requests*/
  
    res.status(200).json(user);
  };
  
  export default withAuth(getUser);