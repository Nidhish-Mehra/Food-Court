import {useState} from 'react'
import M from 'materialize-css'
import { useHistory } from 'react-router-dom'

function Register() {
    const history =useHistory()
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const createUser = ()=>{
        fetch("/signup",{
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
            if(data.error){
                M.toast({html:data.error, classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html: data.message, classes:"#43a047 green darken-1"})
                history.push('/')
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
          onChange={(e)=>{
              setName(e.target.value)
            }}
          />
          <input 
          placeholder="password" 
          type="password"
          value={password} 
          onChange={(e)=>{
              setPassword(e.target.value)
            }}
          />
          <button className="waves-effect waves-light btn large-btn"
          onClick={()=>createUser()}
          >
              Register
          </button>
      </div>
    );
  }
  
  export default Register;