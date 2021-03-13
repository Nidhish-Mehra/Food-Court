import { useState,useEffect } from 'react'
import M from 'materialize-css'

function AddItems() {
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
                M.toast({html: "Retrived Order Successfully", classes:"#43a047 green darken-1"})
            }
        }catch(error){
            console.log(error)
        }
    }

    const createItem = async ()=>{
        try{
            const response = await fetch("http://localhost:5000/createMenuItems",{
                method:"post",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    itemName,
                    itemPrice
                })
            })
            const data  = await response.json()
            if(data.error){
                M.toast({html:data.error, classes:"#c62828 red darken-3"})
            }
            else{
                setMenu(data);
                M.toast({html: "Retrived Order Successfully", classes:"#43a047 green darken-1"})
            }
        }
        catch(error){
            console.log(error)
        }
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
                        <input id="itemName" type="text" className="validate" onChange={(e)=>{setItemName(e.target.value)}}></input>
                    </div>
                    <div className="input-field col s4">
                        <label htmlFor="itemPrice">Item Price</label>
                        <input id="itemPrice" type="text" className="validate" onChange={(e)=>{setItemPrice(e.target.value)}}></input>
                    </div>
                    <div className="input-field col s4">
                        <button id="itemPrice" type="submit" className="validate btn" onClick={createItem}>
                            Submit
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                </div>
        </div>
        </div>
        <div className='container'>
            <div className='row'>
            {menu.map((item)=>{
                return(
                    <div className='col s3'>
                         <div className='card-panel' key={item._id}>
                            <h5>{item.itemName} ₹{item.itemPrice} </h5>
                    </div>
                    </div>
                )
            })}
            </div>
        </div>
        </>
    );
  }

  export default AddItems;