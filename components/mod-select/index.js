import React, {useCallback, useContext, useEffect} from 'react';
import styles from './style.module.scss'
import StoreContext from '../../store'
import { Check, Kapat } from '../icons'
import Button from '../button'
import useOnclickOutside from 'react-cool-onclickoutside'

const THEME = {
  system: {id:'System',name:'Sistem'},
  light: {id:'Light',name:'Aydınlık'},
  dim: {id:'Dim',name:'Hacker'},
  dark: {id:'Dark',name:'Karanlık'},
  sepia: {id:'Sepia',name:'Kahve'},
  null: ''
}
const FONT = {
  sansserif: {id:'Sansserif',name:'Sans Serif'},
  serif: {id:'Serif',name:'Serif'},
  null: ''
}

function ModSelect({ onClick = () => {} }) {
  const store = useContext(StoreContext)
 const escFunction = useCallback((event) => {
    if(event.keyCode === 27) {
      onClick()
    }

  }, []);
  useEffect(() => {
    document.addEventListener("keydown", escFunction,true);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [onClick]);

  const ref = useOnclickOutside(() => {
    onClick()
  })
  return (
    <div className={styles.overlay}>
      <div ref={ref} className={styles.mod}>
        <Button className={styles.kapat} onClick={onClick} type="button" >
          Kapat<Kapat />
        </Button>
        <h2>Bir Tema Seçin</h2>

        <div>
          {store.theme === 'system' && <h3>"Sistem"</h3>}
          {store.theme === 'light' && <h3>"Aydınlık"</h3>}
          {store.theme === 'dark' && <h3>"Karanlık"</h3>}
          {store.theme === 'dim' && <div className={styles.wrapper}><h3 className={styles.glitch}>"Hacker 💻"</h3></div>}
          {store.theme === 'sepia' && <h3>"Kahve ☕"</h3>}
        </div>
        <div className={styles.container}>
          {['system','light', 'dark', 'sepia', 'dim'].map((theme) => {
            const valueOption = theme
            const handleChange = (event) => {
              store.changeTheme(event.target.value)
            }
            return (<button key={theme} id={THEME[theme].id} className={styles.button} value={valueOption} checked={theme === store.theme} onClick={handleChange}><Check/><span>{THEME[theme].name}</span></button>
            )
          })}
        </div>
        <div className={styles.fontselect}><h3 >
          Metin Fontu:
        </h3>
          {['sansserif','serif'].map((font) => {
            const valueOptionFont = font
            const handleChangeFont = (e) => {
              store.changeFont(e.target.value)
            }
            return (<button key={font} id={FONT[font].id} value={valueOptionFont} checked={font === store.font} onClick={handleChangeFont}><span>{FONT[font].name}</span></button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default ModSelect
