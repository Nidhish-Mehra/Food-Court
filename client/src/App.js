import './App.css';
import {BrowserRouter,Route} from 'react-router-dom'
import Login from './components/login';
import Navbar from './components/navbar'
import PlaceOrder from './components/placeOrder';
import Register from './components/register';
import ViewOrder from './components/viewOrder'

function App() {
  return (
    <div className="App">
          <BrowserRouter>

            <Route exact path="/">
              <Login />
            </Route>
            
            <Route path="/register">
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
      
      </BrowserRouter>
    </div>
  );
}

export default App;
