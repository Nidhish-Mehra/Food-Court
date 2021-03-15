import {Link} from 'react-router-dom'
import {useContext} from 'react'
import {UserContext} from '../App'

function Navbar() {
  const {state,dispatch} = useContext(UserContext)
  const renderList = ()=>{
    if(state){
      return[
        <li><Link to="/placeOrder">Place Order</Link></li>,
        <li><Link to="/viewOrder">Show Orders</Link></li>,
        // <li><Link to="/addItems">Add Items</Link></li>,
        <li><Link to="/register">Register New User</Link></li>,
        <li><Link to="/" onClick={()=>{
          localStorage.clear()
          dispatch({type:"CLEAR"})
        }}>
          Logout
          </Link>
        </li>
      ]
    }
  }
  return (
    <div>
        <nav className='blue'>
            <div className="nav-wrapper container">
            <Link to="/placeOrder" className="brand-logo">Food Court</Link>
            <Link to="#!" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></Link>
            <ul className="right hide-on-med-and-down">
              {renderList()}
            </ul>
            </div>
        </nav>

        <ul className="sidenav" id="mobile-demo">
            {renderList()}
        </ul>
    </div>
  );
}

export default Navbar;