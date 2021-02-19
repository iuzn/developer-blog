import React, { useCallback, useEffect } from 'react'
import { IMG, LINK } from '../../constants'
import styles from './style.module.css'
import useOnclickOutside from 'react-cool-onclickoutside'
import Button from '../button'
import Kapat from '../icons/Kapat'


function ProfileBox({ onClick = () => {} }) {
  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      onClick()
    }
  }, [])
  useEffect(() => {
    document.addEventListener('keydown', escFunction, true)

    return () => {
      document.removeEventListener('keydown', escFunction, false)
    }
  }, [onClick])

  const ref = useOnclickOutside(() => {
    onClick()
  })
  return (
    <div className={styles.overlay}>
      <main ref={ref}>
        <Button className={styles.kapat} onClick={onClick} type="button">
          Kapat
          <Kapat />
        </Button>
        <section className="relative ">
          <div className="container mx-auto px-4 justify-center">
            <div className="relative flex flex-col min-w-0 break-words bg-color-primary border-primary w-full mb-6 rounded-lg rounded-large shadow ">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 lg:order-2 flex justify-center ">
                    {IMG.map((img) => {
                      return (
                        <img
                          key={img.name}
                          src={img.src}
                          className="rounded-full h-auto align-middle border-primary-2 border-4 absolute -m-16"
                          style={{ maxWidth: '150px' }}
                          alt={img.alt}
                        />
                      )
                    })}
                  </div>
                </div>
                <div className="text-center mt-20">
                  {IMG.map((img) => {
                    return (
                      <h3
                        key={img.name}
                        className="text-3xl font-semibold leading-normal mb-2 text-color-primary"
                      >
                        {img.name}
                      </h3>
                    )
                  })}

                  <div className="color-primary duration-150 flex gap-4 mt-10 text-5xl justify-center items-center ">
                    {LINK.map((link) => {
                      return (
                        <a
                          className="hover:color-secondary  hover:bg-color-secondary bg-color-primary rounded-large color-primary flex-grow-0 flex-shrink-0 hover:m-0 transition-all duration-200 ease-in-out"
                          key={link.key}
                          href={link.href}
                        >
                          {link.icon}
                        </a>
                      )
                    })}
                  </div>
                </div>
                <div className="py-10 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-10 text-lg  ">
                        Merhaba, adım İbrahim. Günümüz tabiriyle bir ürün
                        tasarımcısıyım. Kendi tabirimle zamane mucidi.
                        Teknolojiyi tasarlamayı ve onu hayata dokunur hale
                        getirmeyi amaçlıyorum. Bir şeyler inşa etmeyi, inşa
                        ederken öğrenmeyi, öğrenirken araştırmayı, araştırırken
                        geliştirmeyi, geliştirirken yeniden yapılandırmayı
                        seviyorum.
                      </p>
                      <a
                        href={'/hakkimda'}
                        className="color-primary border-primary-2 p-2  pr-3 pl-3  rounded-medium hover:bg-color-secondary hover:color-secondary transition duration-150 ease-in-out font-bold"
                      >
                        Hakkımda daha fazlası
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
export default ProfileBox
