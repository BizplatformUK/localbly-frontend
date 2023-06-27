
export default async function handler(req, res) {
    const data = req.body;
    try{
  
    const response = await fetch(process.env.API_URL + 'auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': process.env.ACCESS_TOKEN
      },
      body: JSON.stringify(data)
    });
  
    const user = await response.json();
  
    res.status(200).json(user);
  }catch(error){
    res.status(400).json({err:error})
  }
}