import React, { useContext } from 'react'
import styles from './style.module.css'
import StoreContext from '../../store'
import { Check, Kapat } from '../icons'
import Button from '../button'
import useOnclickOutside from 'react-cool-onclickoutside'

const THEME = {
  light: 'Light',
  dim: 'Dim',
  dark: 'Dark',
  sepia: 'Sepia',
  null: ''
}

function ModSelect({ onClick = () => {} }) {
  const store = useContext(StoreContext)

  const ref = useOnclickOutside(() => {
    onClick()
  })
  return (
    <div className={styles.overlay}>
      <div ref={ref} className={styles.mod}>
        <Button className={styles.kapat} onClick={onClick} type="button">
          <Kapat />
        </Button>
        <h2>Bir Tema Seçin</h2>

        <div>
          {store.theme === 'light' && <h3>"Aydınlık"</h3>}
          {store.theme === 'dark' && <h3>"Karanlık"</h3>}
          {store.theme === 'dim' && <h3>"Loş"</h3>}
          {store.theme === 'sepia' && <h3>"Sepya"</h3>}
        </div>

        <div className={styles.container}>
          {['light', 'dark', 'sepia', 'dim'].map((theme) => {
            const valueOption = theme
            const handleChange = (event) => {
              store.changeTheme(event.target.value)
            }
            return (
                <button key={theme} id={THEME[theme]} className={styles.button} value={valueOption} checked={theme === store.theme} onClick={handleChange}><Check/></button>


            )
          })}
        </div>
      </div>
    </div>
  )
}
export default ModSelect
