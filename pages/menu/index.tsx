import { GetServerSidePropsResult } from "next";

export async function getServerSideProps() : Promise<GetServerSidePropsResult<any>>{
  return {
    redirect : {
      destination : '/menu/user',
      permanent : true
    }
  }
}

export default function Index(){
  return (<></>);
}