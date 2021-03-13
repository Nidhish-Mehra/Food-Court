import { useState, useEffect } from 'react'
import M from 'materialize-css'
import { useHistory } from 'react-router-dom'

function AddItems() {
    const history = useHistory()
    const [menu,setMenu] = useState([])
    const [itemName,setItemName] = useState('')
    const [itemPrice,setItemPrice] = useState('')

    const getMenuItems =async ()=>{
       try{
            const response = await fetch("/getMenuItems")
            const data = await response.json()
            if(data.error){
                M.toast({html:data.error, classes:"#c62828 red darken-3"})
            }
            else{
                setMenu(data);
                M.toast({html: "Retrived Menu Successfully", classes:"#43a047 green darken-1"})
            }
        }catch(error){
            console.log(error)
        }
    }
    const createItem = ()=>{
        fetch("/createMenuItem",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                itemName,
                itemPrice
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

    useEffect(()=>{
        getMenuItems();
    },[])

    return (
        <>
        <div className='container'>
        <div className="row">
                <div className="row">
                    <div className="input-field col s4">
                        <label htmlFor="itemName">Item Name</label>
                        <input 
                            placeholder="name" 
                            type="text" 
                            value={itemName} 
                            onChange={(e)=>{
                                setItemName(e.target.value)
                                }}
                            />
                    </div>
                    <div className="input-field col s4">
                        <label htmlFor="itemPrice">Item Price</label>
                        <input 
                            placeholder="name" 
                            type="text" 
                            value={itemPrice} 
                            onChange={(e)=>{
                                setItemPrice(e.target.value)
                                }}
                            />
                    </div>
                    <div className="input-field col s4">
                    <button className="waves-effect waves-light btn large-btn"
                            onClick={()=>createItem()}
                            >
                                Add
                            </button>
                    </div>
                </div>
        </div>
        </div>
        <div className='container'>
            {menu.map((item)=>{
                return(
                    <div className='card' key={item._id}>
                        <h4>Itemname : {item.itemName} </h4>
                        <h4> Price {item.itemPrice}</h4>
                    </div>
                )
            })}
        </div>
        </>
    );


}


  

  export default AddItems;