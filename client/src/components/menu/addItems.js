import { useState, useEffect } from 'react'
import M from 'materialize-css'
import { useHistory } from 'react-router-dom'

function AddItems() {
    const [menu,setMenu] = useState([])
    const [itemName,setItemName] = useState('')
    const [itemPrice,setItemPrice] = useState('')
    const [loading,setLoading] = useState(false)
    const getMenuItems =async ()=>{
       try{
            const response = await fetch('/getMenuItems')
            const data = await response.json()
            if(data.error){
                M.toast({html:data.error, classes:'#c62828 red darken-3'})
            }
            else{
                setMenu(data);
                M.toast({html: 'Retrived Menu Items Successfully', classes:'#43a047 green darken-1'})
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
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
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
            setLoading(true)
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
                setLoading(false)
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
                <div className='row section'>
                    <h4>Add Item</h4>
                    <div className='divider'></div>
                    <div className='input-field col s12'>
                        <label htmlFor='itemName'>Item Name</label>
                        <input
                            required
                            id='itemName'
                            type='text'
                            value={itemName}
                            onChange={(e)=>{
                                setItemName(e.target.value)
                                }}
                            />
                    </div>
                    <div className='input-field col s12'>
                        <label htmlFor='itemPrice'>Item Price</label>
                        <input
                            required
                            id='itemPrice'
                            type='number'
                            value={itemPrice}
                            onChange={(e)=>{
                                setItemPrice(e.target.value)
                                }}
                            />
                    </div>
                    <div className='input-field col s12'>
                    <button className='blue btn'
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
            <h4>All Items</h4>
            <div className='divider'></div>
                <div className='section'>
                    {menu.map((item)=>{
                        return(
                                <div className='col s3' key={item._id}>
                                <div className='card-panel' key={item._id}>
                                    <div className='row'>
                                        <div className='col s6'>
                                            <h6>{item.itemName} ₹{item.itemPrice}  </h6>

                                        </div>

                                        <div className='col s6'>
                                            <input
                                                className={loading ? 'btn red large-btn disabled' : 'btn red large-btn' }
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
        </div>
        </>
    );


}


  export default AddItems;