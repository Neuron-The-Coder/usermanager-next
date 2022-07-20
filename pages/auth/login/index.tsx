import axios from 'axios';
import Cookies from 'js-cookie';
import { GetServerSidePropsResult } from 'next';
import { NextURL } from 'next/dist/server/web/next-url';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './login.module.scss';

interface LoginData {
  email: string;
  password: string;
}

export async function getServerSideProps() : Promise<GetServerSidePropsResult<any>>{
  
  if (Cookies.get('Token') != null){
    const result = await axios.post('/api/auth/validate', {
      token : Cookies.get('Token')
    });
    
    if (result.status == 200){
      return {
        redirect : {
          destination : '/menu/user',
          permanent : false
        }
      }
    }

    else return {
      props : { message : "Session expired" }
    }
  }

  return {
    props : { }
  }

}

export default function Login({ props } : { props : any }){

  const router = useRouter();

  const [msg, setMsg] = useState((props) ? (props.message ?? "") : "");

  const [login, setLogin] = useState<LoginData>({
    email : "",
    password : ""
  });

  const sendForm = async () => {
    
    const result = await axios.post('/api/auth/auth', login);
    if (result.status == 200) {
      Cookies.set('Token', result.data.token);

      router.push('/menu');
    }
    else setMsg("Invalid email or password");
  }

  return(
    <div className={ styles.containerLogin }>
      <div className={ styles.left }>
        <div className={ styles.leftImage }>
          <Image
            src={ '/images/login.jpg' }
            layout="fill"
            alt="nothing"/>
        </div>
      </div>
      <div className={ styles.right }>

        <div className={ styles.rightForm }>

          <h1>Login</h1>
          
          <div className={ styles.formGroup }>
            <input type="email" className={ styles.formInput } id="email" placeholder='Email'
              onChange={ (e) => setLogin({ ...login, email : e.target.value }) } value={ login.email }/>
            <label htmlFor="email" className={ styles.formLabel }>Email</label>
          </div>

          <div className={ styles.formGroup }>
            <input type="password" className={ styles.formInput } id="password" placeholder='Password'
              onChange={ (e) => setLogin({ ...login, password : e.target.value }) } value={ login.password }/>
            <label htmlFor="password" className={ styles.formLabel }>Password</label>
          </div>

          <div className={ styles.errorAlert }>{ msg }</div>

          <button type='button' className={ styles.formButton + ' btn btn-primary' } onClick={ () => { sendForm() } }>Login</button>

        </div>
      </div>
    </div>
  )
}