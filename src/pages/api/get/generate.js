import { withAuth } from "../middlewares";

const generateText = async(req, res) => {
    //const session = req.user
    const {text} = req.query
      try{

        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${process.env.OPENAI_KEY}`
            },
            body:JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {role:'system', content:'You are an ecommerce website copywriter'},
                    {role: 'user', content: `Write a SEO friendly description of this product ${text} and the description should not exceed 80 words`}
                ],
                temperature: 0.3,
                //max_tokens: 60,
                frequency_penalty:1
            })
        }

      //const data = req.body;
      
      const response = await fetch(process.env.OPENAI_URL, options);
      const description = await response.json();
    
      res.status(200).json(description.choices[0].message);
    }catch(error){
      res.status(500).json({err:error});
    }
  };
  
  export default withAuth(generateText);