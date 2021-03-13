import { useState,useEffect } from 'react';
import M from 'materialize-css'

function PlaceOrder() {
    const [menu,setMenu] = useState([])
    const [order,setOrder] = useState([])
    const [value,setValue] = useState(0)

    const getMenuItems = async ()=>{
        try{
             const response = await fetch('/getMenuItems')
             const data = await response.json()
             if(data.error){
                 M.toast({html:data.error, classes:'#c62828 red darken-3'})
             }
             else{
                 console.log(data)
                 setMenu(data);
                 M.toast({html: 'Retrived Menu Items Successfully', classes:'#43a047 green darken-1'})
             }
         }catch(error){
             console.log(error)
         }
    }

    const createItem = async()=>{
        try{
            const date = new Date();
            const orderDate = date.toISOString();
            const res = await fetch('/createMenuItem',{
                method:'post',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    orderDate
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

    useEffect(()=>{
        getMenuItems();
    },[])

    const handleOrder =(e)=> {
        const newOrder = {
            itemName:'',
            quantity:0,
        };
        if(newOrder.itemName !== e.target.name){
            newOrder.quantity = e.target.value
        }
        console.log(newOrder)
    }

    return (
        <>
        <div className='container'>
            <div className='row'>
                <div className='row section'>
                    <h4>Customer Details</h4>
                    <div className='divider'></div>
                    <div className='input-field col s12'>
                        <label htmlFor='custName'>Customer Name</label>
                        <input
                            id='itemName'
                            type='text'
                            />
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
                                            <h6>{item.itemName} ₹{item.itemPrice}</h6>


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

  export default PlaceOrder;