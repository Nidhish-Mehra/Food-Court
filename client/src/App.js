import {useEffect,useReducer,createContext, useContext} from 'react';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Navbar from './components/navbar'
import Footer from './components/footer'
import Login from './components/auth/login';
import Register from './components/auth/register';
import PlaceOrder from './components/orders/placeOrder';
import ViewOrder from './components/orders/viewOrder'
import AddItems from './components/menu/addItems'
import {reducer,initialState} from './reducers/userReducer'

export const UserContext = createContext()

const Routing = ()=>{
  const history = useHistory()

    const PresentToken = localStorage.getItem("jwt")
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
      if(PresentToken){
        dispatch({type:"USER",payload:PresentToken})
        history.push('/placeOrder')
    }else{
      history.push('/')
    }
  },[])
  return(
    <Switch>
          <Route exact path="/">
              <Login />
          </Route>
          <Route path="/register">
              <Register />
          </Route>
          <Route path="/placeOrder">
              <PlaceOrder />
          </Route>
          <Route path="/viewOrder">
              <ViewOrder />
          </Route>
          <Route path="/addItems">
              <AddItems />
          </Route>
    </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <div className="App" >
      <UserContext.Provider value={{state,dispatch}}>
          <BrowserRouter>
              <Navbar />
                <Routing />
              <Footer />
          </BrowserRouter>
      </UserContext.Provider>

    </div>
  );
}

export default App;
