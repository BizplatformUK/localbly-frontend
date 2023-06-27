
export default async function changePassword(req, res) {
    //const {email} = req.body;
    try{
  
    const response = await fetch(process.env.API_URL + 'auth/password-reset', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': process.env.ACCESS_TOKEN
      },
      body: JSON.stringify(req.body)
    });
  
    const user = await response.json();
  
    res.status(200).json(user);
  }catch(error){
    res.status(400).json({err:error})
  }
}