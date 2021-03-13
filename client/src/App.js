import {BrowserRouter,Route} from 'react-router-dom'
import Navbar from './components/navbar'
import Login from './components/auth/login';
import Register from './components/auth/register';
import PlaceOrder from './components/orders/placeOrder';
import ViewOrder from './components/orders/viewOrder'
import AddItems from './components/menu/addItems'

function App() {
  return (
    <div className="App" >
          <BrowserRouter>

            <Route exact path="/">
              <Navbar />
              <Login />
            </Route>

            <Route path="/register">
              <Navbar />
              <Register />
            </Route>

            <Route path="/placeOrder">
              <Navbar />
              <PlaceOrder />
            </Route>

            <Route path="/viewOrder">
              <Navbar />
              <ViewOrder />
            </Route>

            <Route path="/addItems">
              <Navbar />
              <AddItems />
            </Route>

      </BrowserRouter>
    </div>
  );
}

export default App;
