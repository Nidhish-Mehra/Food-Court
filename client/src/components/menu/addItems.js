import { useState, useEffect } from 'react'
import M from 'materialize-css'
import { useHistory } from 'react-router-dom'

function AddItems() {
    const [menu,setMenu] = useState([])
    const [itemName,setItemName] = useState('')
    const [itemPrice,setItemPrice] = useState('')

    const getMenuItems =async ()=>{
       try{
            const response = await fetch('/getMenuItems')
            const data = await response.json()
            if(data.error){
                M.toast({html:data.error, classes:'#c62828 red darken-3'})
            }
            else{
                setMenu(data);
                M.toast({html: 'Retrived Menu Successfully', classes:'#43a047 green darken-1'})
            }
        }catch(error){
            console.log(error)
        }
    }

    const createItem = async()=>{
        try{
            const res = await fetch('/createMenuItem',{
                method:'post',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    itemName,
                    itemPrice
                })
            })
            const data = await res.json()
            if(data.error){
                M.toast({html:data.error, classes:'#c62828 red darken-3'})
            }
            else{
                setMenu((prevState)=>{
                    return [...prevState,data]
                })
                console.log(menu)
                M.toast({html: 'Menu Item Created Successfully', classes:'#43a047 green darken-1'})
            }
        }catch(error){
            console.log(error)
        }
    }

    const deleteMenuItem = async(itemName)=> {
        try{
            const res = await fetch('/deleteMenuItem',{
                method:'post',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    itemName
                })
            })
            const data = await res.json()
            if(data.error){
                M.toast({html:data.error, classes:'#c62828 red darken-3'})
            }
            else{
                setMenu(data)
                M.toast({html: 'Item Deleted Successfully', classes:'#43a047 green darken-1'})
            }
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        getMenuItems();
    },[])

    return (
        <>
        <div className='container'>
        <div className='row'>
                <div className='row'>
                    <div className='input-field col s4'>
                        <label htmlFor='itemName'>Item Name</label>
                        <input
                            placeholder='name'
                            type='text'
                            value={itemName}
                            onChange={(e)=>{
                                setItemName(e.target.value)
                                }}
                            />
                    </div>
                    <div className='input-field col s4'>
                        <label htmlFor='itemPrice'>Item Price</label>
                        <input
                            placeholder='name'
                            type='text'
                            value={itemPrice}
                            onChange={(e)=>{
                                setItemPrice(e.target.value)
                                }}
                            />
                    </div>
                    <div className='input-field col s4'>
                    <button className='waves-effect waves-light btn large-btn'
                            onClick={()=>createItem()}
                            >
                                Add
                            </button>
                    </div>
                </div>
        </div>
        </div>
        <div className='container'>
            <div className='row'>
            {menu.map((item)=>{
                return(
                    <div className='col s4' key={item._id}>
                         <div className='card-panel' key={item._id}>
                            <div className='row'>
                                <div className='col s6'>
                                    <h6>{item.itemName} ₹{item.itemPrice} </h6>
                                </div>

                                <div className='col s6'>
                                    <input
                                        className='btn pink large-btn'
                                        type='button'
                                        name={item.itemName}
                                        value='Delete'
                                        onClick={(e)=>{deleteMenuItem(e.target.name)}}></input>
                                </div>
                            </div>
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