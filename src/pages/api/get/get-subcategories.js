import { withAuth } from "../middlewares";

const getSubcategories = async(req, res) => {
    const session = req.user
    const {term, page} = req.query;
    let url = term ? process.env.API_URL + `subcategories/search-subcategories?id=${session.shop.id}&page=${page}&term=${term}`: 
                    process.env.API_URL +  `subcategories/get-subcategories?id=${session.shop.id}&page=${page}`; 
    const response = await fetch(url, {
      method: 'GET',
      headers: {'content-type': 'application/json', 'Ocp-Apim-Subscription-Key': process.env.ACCESS_TOKEN}
    });
    const subcategories = await response.json()
    // Use the userId and sessionToken to make API requests
  
    res.status(200).json(subcategories);
  };
  
  export default withAuth(getSubcategories);