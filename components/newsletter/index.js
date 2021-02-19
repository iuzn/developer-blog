import { useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import clsx from 'clsx'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [state, setState] = useState('IDLE')
  const [errorMessage, setErrorMessage] = useState(null)

  const subscribe = async () => {
    setState(loadingnotify)
    setErrorMessage(null)
    try {
      await axios.post('/api/newsletter', { email })
      setState(successnotify)
    } catch (e) {
      setErrorMessage(e.response.data.error)
      setState(errornotify)
    }
  }

  const loadingnotify = () =>
    toast.loading('Bekleyin..', {
      duration: 800
    })
  const successnotify = () =>
    toast.success('E-postanız başarıyla listeye eklendi.', {
      duration: 8000
    })
  const errornotify = () =>
    toast.error(`${errorMessage}`, {
      role: 'status',
      ariaLive: 'polite'
    })
  {
    state === '' && toast.remove(loadingnotify())
  }
  return (
    <div className="flex flex-col items-center p-8 m-10 bg-color-secondary rounded-large">
      <h2 className="text-3xl font-bold text-center color-secondary">
        E-bültenime abone ol!
      </h2>
      <p className="mt-2 w-4/5 text-center leading-relaxed color-secondary">
        En son yazdığım blog yazılarından haberdar olmak için e-postanızı girin.
      </p>
      <form className="flex border-secondary bg-color-primary  sm:block mt-6 rounded-full p-px animate-wiggle">
        <label htmlFor={email}>
          <input
            id={email}
            className={clsx(
              'py-3 px-3 border-none bg-transparent w-48 sm:w-64'
            )}
            type="text"
            placeholder="E-posta Girin"
            value={email}
            onKeyPress={(e) => {
              e.key === 'Enter' && subscribe() && e.preventDefault()
            }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="button"
            value="Abone ol"
            onClick={subscribe}
            className="button-primary inline-block py-3 px-6 cursor-pointer"
          />
        </label>
        <Toaster
          toastOptions={{
            className: 'bg-color-secondary',
            style: {
              color: 'var(--c-text-color)',
              padding: '16px',
              backgroundColor: 'var(--c-primary-80)',
              backdropFilter: 'saturate(150%) blur(10px)'
            }
          }}
          position="bottom-right"
          reverseOrder={false}
        />
      </form>
    </div>
  )
}

export default Newsletter
