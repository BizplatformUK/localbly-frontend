import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";


export default NextAuth({
  providers:[
     CredentialsProvider({
      name:'credentials',
      async authorize(credentials, res){
          const data = {
              email: credentials.email,
              password:credentials.password
          };
            const result = await fetch(process.env.API_URL + 'auth/login', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Ocp-Apim-Subscription-Key': process.env.ACCESS_TOKEN
                }
            });
          const response = await result.json()
          if(result.status === 401 || result.status === 404){
              throw new Error(response.error)
          } 
          const user = {
              name:response.name,
              id:response.id,
              token:response.token,
              role:response.role,
              email:response.email,
             
          }
          if(result.ok && response){
              return user
          }else{
            throw new Error(response.error)
          }
          
      }
     }),
  ],
  debug: true,
  
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 30 days
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },

  pages: {
    signIn: '/login',
    signOut: '/login'
  },
  
  callbacks:{
      jwt:({token, user}) => {
          if(user){
              token.id = user.id,
              token.jwt = user.token
              token.role = user.role,
              token.email = user.email
          }
          return token;
      },
      session:({session,token}) => {
          if(token){
              session.token = token.jwt;
              session.id = token.id
              session.role = token.role,
              session.email = token.email
          }
          return session;
      }
      
  }
})



      
  