

function Navbar() {
  return (
    <div>
        <nav className='blue'>
            <div className="nav-wrapper container">
            <a href="/placeOrder" className="brand-logo">Food Court</a>
            <a href="#!" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down">
                <li><a href="/placeOrder">Place Order</a></li>
                <li><a href="/viewOrder">Show Orders</a></li>
                <li><a href="/addItems">Add Items</a></li>
            </ul>
            </div>
        </nav>

        <ul className="sidenav" id="mobile-demo">
            <li><a href="/placeOrder">Place Order</a></li>
            <li><a href="/viewOrder">Show Orders</a></li>
            <li><a href="/addItems">Add Items</a></li>
        </ul>
    </div>
  );
}

export default Navbar;