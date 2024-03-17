import { Badge, Button, Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { Outlet } from 'react-router'
import { Store } from './Store'
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from "react-router-bootstrap"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


function App() {
  const { state: { mode, cart, userInfo }, dispatch } = useContext(Store)

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', mode)
  }, [mode])

  const switchModeHandler = () => {
    dispatch({ type: 'SWITHC_MODE' })
  }

  const handleSingOut = () => {
    dispatch({ type: 'USER_SIGNOUT' })
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    window.location.href = '/signin'
  }
 
  return (
    <div className='d-flex flex-column h-full vh-100'>
      <ToastContainer position='bottom-center' limit={1} />
      <header>
        <Navbar bg={ mode === 'light' ? 'dark' : 'secondary' } variant={ mode === 'light' ? 'dark' : 'light' } expand='lg'>
          <Container>
            <LinkContainer to={'/'}>
              <Navbar.Brand>Online Store</Navbar.Brand>
            </LinkContainer>
            
          </Container>
          <Nav>
            {userInfo ? (
              <NavDropdown title={`Hello, ${userInfo.name}`} id='basic-nav-dropdown' className={`header-link`}>
                <Link className='dropdown-item' to={'#singout'} onClick={handleSingOut}>Sing Out</Link>
              </NavDropdown>
            ) : (
              <Link className={` nav-link`} to='/signin'>Sign In</Link>
            )}
            
            <Link to='/cart' className={` nav-link`}>
              Cart {' '}
              {cart.cartItems.length > 0 && (
                <Badge pill bg='danger'>
                  {cart.cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </Badge>
              )}
            </Link>

            <Button variant={mode} onClick={switchModeHandler}>
                <i className={ mode === 'light' ? 'fa fa-sun' : 'fa fa-moon' }></i>
            </Button>
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
