'use client'


import '@fortawesome/fontawesome-svg-core/styles.css';
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Nav from '@/components/Nav';
import { Provider } from 'react-redux';
import { store } from "../redux/store"


export const RootLayout = ({ children }) => {
  return (
    <Provider store={store}>
      <html lang="en">
          <body>
              <Nav/>
              {children}
              <ToastContainer
                position='top-center'
                hideProgressBar
                autoClose={4000}
                pauseOnHover
                limit={1}
                theme='dark'
              />
          </body>
      </html>
    </Provider>
  )
}

export default RootLayout