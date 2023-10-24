import CookiesJS from 'js-cookie'
import styles from "./index.module.scss";
import { useEffect, useState } from 'react';
import { Button } from '@/ui';

const Cookies = () => {
  const [close, setClose] = useState(true)

  const setCookies = () => {
    CookiesJS.set('accepted_cookies', 'true',
      { expires: 365, path: '/' })

    setClose(true)
  }

  useEffect(() => {
    CookiesJS.get('accepted_cookies')
      ? setClose(true)
      : setClose(false)
  }, [])


  return (
    <>
      {!close &&
        <div className={`${styles.cookiesWrapper}`}>
          <div>
            <p>
              Nós utilizamos cookies para melhorar a sua experiência de navegação. Confira nossos <a href="https://www.amstelbrasil.com/informacoes-legais/termos-de-uso/" target="_blank" rel="noreferrer">Termos de Uso</a> e <a href="https://www.amstelbrasil.com/informacoes-legais/politica-de-privacidade/" target="_blank" rel="noreferrer">Política de privacidade</a> para saber mais.
            </p>
            <div>
              <button type="button" onClick={() => setCookies()}>
                Concordar e fechar
              </button>
              <button type="button" onClick={() => setClose(true)}>
                Recusar
              </button>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Cookies
