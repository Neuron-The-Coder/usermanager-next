import styles from './icon.module.scss';

export default function Icon({ icon, addClass = "", addIconClass = "" } : { icon : string, addClass? : string, addIconClass? : string }){
  return (
    <div className={ styles.iconBox + addClass }>
      <i className={ icon + addIconClass }></i>
    </div>
  )
}