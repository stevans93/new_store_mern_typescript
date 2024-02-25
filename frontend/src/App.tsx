import { Container, Nav, Navbar } from 'react-bootstrap'
import { Outlet } from 'react-router'

function App() {


  return (
    <div className='d-flex flex-column h-full vh-100'>
      <header>
        <Navbar bg='dark' variant='dark' expand='lg'>
          <Container>
            <Navbar.Brand>Online Store</Navbar.Brand>
          </Container>
          <Nav>
            <a href='/cart' className="nav-link">Cart</a>
            <a href='/signin' className="nav-link">Sign In</a>
          </Nav>
        </Navbar>
      </header>
      <main>
        <Container className='mt-3 d-flex justify-content-center'>
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
