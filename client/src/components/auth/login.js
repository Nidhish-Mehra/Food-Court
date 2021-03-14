import {useState,useContext} from 'react'
import M from 'materialize-css'
import {UserContext} from '../../App'
import { useHistory } from 'react-router-dom'

function Login() {
          const {state,dispatch} = useContext(UserContext)
          const history =useHistory()
          const [name,setName] = useState("")
          const [password,setPassword] = useState("")
          const [loading,setLoading] = useState(false)
          const signInUser = ()=>{
              setLoading(true)
              fetch("/signin",{
                  method:"post",
                  headers:{
                      "Content-Type":"application/json"
                  },
                  body:JSON.stringify({
                      name,
                      password
                  })
              }).then(res=>res.json())
              .then(data=>{
                    setLoading(false)
                  if(data.error){
                      M.toast({html:data.error, classes:"#c62828 red darken-3"})
                  }
                  else{
                      localStorage.setItem("jwt",data.token)
                      dispatch({type:"USER",payload:data.token})
                      M.toast({html: "Signed In Successully", classes:"#43a047 green darken-1"})
                      history.push('/placeOrder')
                  }
              }).catch(error=>{
                  console.log(error)
              })
          }
    return (
          <div className="card" style={{maxWidth:'500px', padding: '10px' ,margin: '200px auto', textAlign: 'center'}}>
              <input
              placeholder="name"
              type="text"
              value={name}
              autoComplete='off'
              required
              onChange={(e)=>{
                  setName(e.target.value)
                }}
              />
              <input
              placeholder="password"
              type="password"
              value={password}
              autoComplete='off'
              required
              onChange={(e)=>{
                  setPassword(e.target.value)
                }}
              />
              <button className={loading? 'waves-effect waves-light btn large-btn disabled' : 'waves-effect waves-light btn large-btn'}
              onClick={()=>signInUser()}
              >
                  Sign IN
              </button>
          </div>
    );
  }

  export default Login;