import { Badge, Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Outlet } from 'react-router'
import { Store } from './Store'
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from "react-router-bootstrap"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


function App() {
  const { state: { mode, cart }, dispatch } = useContext(Store)

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', mode)
  }, [mode])

  const switchModeHandler = () => {
    dispatch({ type: 'SWITHC_MODE' })
  }
 
  return (
    <div className='d-flex flex-column h-full vh-100'>
      <ToastContainer position='bottom-center' limit={1} />
      <header>
        <Navbar bg={ mode === 'light' ? 'dark' : 'light' } variant={ mode === 'light' ? 'dark' : 'light' } expand='lg'>
          <Container>
            <LinkContainer to={'/'}>
              <Navbar.Brand className={`${ mode === 'light' ? 'link-light' : 'link-dark' } nav-link`}>Online Store</Navbar.Brand>
            </LinkContainer>
            
          </Container>
          <Nav>
            <Button variant={mode} onClick={switchModeHandler}>
                <i className={ mode === 'light' ? 'fa fa-sun' : 'fa fa-moon' }></i>
            </Button>
            <Link to='/cart' className={`${ mode === 'light' ? 'link-light' : 'link-dark' } nav-link`}>
              Cart {' '}
              {cart.cartItems.length > 0 && (
                <Badge pill bg='danger'>
                  {cart.cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </Badge>
              )}
            </Link>
            <a href='/signin' className={`${ mode === 'light' ? 'link-light' : 'link-dark' } nav-link`}>Sign In</a>
          </Nav>
        </Navbar>
      </header>
      <main>
        <Container className='mt-3'>
          <Outlet />
        </Container>
        
        
      </main>
      <footer>
        <div className='text-center'>
          All right reserved
        </div>
      </footer>
    </div>
  )
}

export default App
