import axios from "axios";
import Cookies from "js-cookie";
import { GetServerSidePropsResult, Redirect } from "next";
import { AppProps } from "next/app";

export async function getServerSideProps() : Promise<GetServerSidePropsResult<any>>{

  let token = Cookies.get('token') ?? "";

  let result = await axios.post('/api/auth/validate', {
    token : token
  });

  if (result.status == 200) return {
    redirect : {
      destination : '/auth/login',
      permanent : false
    }
  }

  return {
    props : {
      a : "aaa"
    }
  };
}

export default function MenuApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}