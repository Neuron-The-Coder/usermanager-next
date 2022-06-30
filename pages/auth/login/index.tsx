import Image from 'next/image';
import styles from './login.module.scss';

export default function Login(){
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
            <input type="email" className={ styles.formInput } id="email" placeholder='Email'/>
            <label htmlFor="email" className={ styles.formLabel }>Email</label>
          </div>

          <div className={ styles.formGroup }>
            <input type="password" className={ styles.formInput } id="password" placeholder='Password'/>
            <label htmlFor="password" className={ styles.formLabel }>Password</label>
          </div>

          <div className={ styles.errorAlert }></div>

          <button type='button' className={ styles.formButton + ' btn btn-primary' }>Login</button>

        </div>
      </div>
    </div>
  )
}