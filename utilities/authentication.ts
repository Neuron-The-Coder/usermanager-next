import axios from "axios";

export async function Auth(token : string) : Promise<boolean>{

  const result = await axios.post('/api/auth/validate', {
    token : token
  });

  return (result.status === 200);
}
