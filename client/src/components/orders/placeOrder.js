import { useState,useEffect } from 'react';
import M from 'materialize-css'

function PlaceOrder() {
    const [menu,setMenu] = useState([])
    const [order,setOrder] = useState({})
    const [value,setValue] = useState(0)
    const getMenuItems = ()=>{
        fetch("/getMenuItems",{
            method:"get",
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error, classes:"#c62828 red darken-3"})
            }
            else{
                setMenu(data);
                M.toast({html: "Retrived Order Successfully", classes:"#43a047 green darken-1"})
            }
        }).catch(error=>{
            console.log(error)
        })
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
            {menu.map((item)=>{
                return(
                    <div className='card' key={item._id}>
                        <h4>Itemname : {item.itemName} </h4>
                        <h4> Price {item.itemPrice}</h4>
                        <input type='number' placeholder='Number of plates' name={item.itemName} min='0'></input>
                    </div>
                )
            })}
            <input type='submit' onClick='handeOrder'></input>
        </div>
        </>
    );
  }

  export default PlaceOrder;