import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { ReactNode, useState } from 'react';
import Icon from '../utils/icon';
import styles from './dashboard.module.scss';
import interStyles from './interactive.module.scss';

// Type itu kayak struct. Kenot contain methods
interface INavLink{
  name : string,
  link : string,
  icon : string,
}

interface IInteractive {
  loading : boolean,
  alert : boolean,
  popup : boolean
}

export interface IInteractiveUtils {
  showLoading() : void,
  closeInteractive() : void
}

export default function Dashboard({ children }: { children: JSX.Element }) {
  
  const router = useRouter();
  const links : INavLink[] = [
    {
      name : "User",
      link : "/menu/user",
      icon : "bi bi-people-fill"
    },
    {
      name : "Role",
      link : "/menu/role",
      icon : "bi bi-star-fill"
    },
    {
      name : "User Role",
      link : "/",
      icon : "bi bi-list-stars"
    },
    {
      name : "Limitations",
      link : "/menu/limitations",
      icon : "bi bi-emoji-frown-fill"
    }
  ]; 

  const [interactive, setInteractive] = useState<IInteractive>({
    loading : false,
    alert : false,
    popup : false
  });

  const interactiveUtils : IInteractiveUtils = {
    closeInteractive : () => { setInteractive({ loading : false, alert : false, popup : false }) },
    showLoading : () => { setInteractive({ loading : true, alert : false, popup : false }) }
  }

  let inter : JSX.Element | null = null;
  if (interactive.loading) inter = (<Loading/>);
  
  return (
    <div className={ styles.containerCustom }>
      <nav>
        <div className={ styles.top }>
          <Link href='/'><a className={ styles.title }>UserManager</a></Link>
          <ul className={ styles.navMenu }>
            {
              links.map((link) => (
                <li className={ styles.navLink + ' ' + ((router.pathname == link.link) ? styles.navActiveLink : "") } key={ link.name }>
                  <Link href={ link.link }>
                    <a>
                      <Icon icon={ link.icon } addClass={ styles.iconBoxes } addIconClass={ styles.iconBoxesI }></Icon>
                      <p>{ link.name }</p>
                    </a>
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
        <div className={ styles.bottom }>
          <div className={ styles.picture }>
            <Image src='/images/sample/simo_hayha.jpg' alt='Simo' layout='fill'/>
          </div>
          <div className={ styles.info }>
            <p className={ styles.name }>Simo Häyhä</p>
            <p className={ styles.role }>Sniper</p>
          </div>
        </div>
      </nav>
      <main className={((inter != null) ? styles.hasInteractive : "")}>
        <div className={ styles.interactive }>
          { inter ?? (<></>) }
        </div>
        <div className={ styles.siteContent }>
          { React.cloneElement(children, { interactive : interactiveUtils }) }
        </div>
      </main>
    </div>
  )
};

function Loading() : JSX.Element{
  return(
    <div className={ interStyles.loader }>
      <div className="spinner-border " role="status"></div>
      <span>Loading...</span>
    </div>
  )
}