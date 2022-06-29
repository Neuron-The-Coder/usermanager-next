import Dashboard from "../../components/dashboard/dashboard";
import styles from './limitations.module.scss';

export default function Limitations(){

  return(
    <Dashboard>
      <>
        <h2>Pls help me { ':(' }</h2>
        <ol>
          <li>How to pass props from components to pages (for example... I want to pass props from /components/dashboard/dashboard.tsx to /pages/menu/user.tsx)</li>
        </ol>
      </>
    </Dashboard>
  )

}