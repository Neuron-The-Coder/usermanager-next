import { GetServerSideProps, GetServerSidePropsResult, Redirect } from "next";

// Walau hanya redirect, tetap SANGAD PENTING untuk ada export def function Index. 
export async function getServerSideProps() : Promise<GetServerSidePropsResult<Redirect>>{
  return {
    redirect : {
      destination : '/menu/user',
      permanent : true
    }
  }
}

// Walau cuma redirect, ini masih perlu
export default function Index(){
  return (
    <p>Yo</p>
  )
}