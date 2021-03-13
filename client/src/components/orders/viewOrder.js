import { useState,useEffect } from 'react'
import M from 'materialize-css'

function ViewOrder() {
  const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
  const dateObj = new Date();
  const month = monthNames[dateObj.getMonth()];
  const day = String(dateObj.getDate()).padStart(2, '0');
  const year = dateObj.getFullYear();
  const output = month  + '\n'+ day  + ',' + year;
  let totalPrice = 0;

  const [order,setOrder] = useState([])
  const [menu,setMenu] = useState([])

  const getMenuItems = async()=>{
    try{
      const res = await fetch("/getMenuItems",{
        method:"get",
        headers:{
            "Content-Type":"application/json"
        }
      })
      const data = await res.json()
      if(data.error){
        M.toast({html:data.error, classes:"#c62828 red darken-3"})
      }
      else{
        setMenu(data);
        M.toast({html: "Retrived Order Details Successfully", classes:"#43a047 green darken-1"})
      }
    }catch(error){
      console.log(error)
    }
  }

  const getOrders = async()=>{
      try{
        const res = await fetch("/getOrders",{
          method:"get",
          headers:{
            "Content-Type":"application/json"
          }
        })
        const data = await res.json()
        if(data.error){
          M.toast({html:data.error, classes:"#c62828 red darken-3"})
        }
        else{
          setOrder(data);
          console.log(order)
          M.toast({html: "Retrived Successfully", classes:"#43a047 green darken-1"})
        }
      }
      catch(error){
        console.log(error)
      }
  }

  useEffect(()=>{
    getMenuItems();
    getOrders();
    console.log(order);
  },[])

  return (
      <>
      <div className='container'>
        <div className='row'>
        <div className='col s12'>
              <div className='recentOrders section'>
                <h4>Orders in last - <strong>10 minutes</strong></h4>
                <div className='divider'></div>
                  <table className='striped responsive'>
                    <thead>
                      <tr>
                          <th>Customer Name</th>
                          <th>Item Name</th>
                          <th>Item Quantity</th>
                          <th>Completed</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>Alvin</td>
                        <td>Eclair</td>
                        <td>$0.87</td>
                        <td>
                        <p>
                          <label htmlFor='check'>
                            <input id='check' type="checkbox" className="filled-in" />
                            <span onChange={()=>{console.log('Hi')}}>Completed?</span>
                          </label>
                        </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
              </div>
          </div>
          <div className='col s12'>
            <div className='todaysSale section'>
              <h4>Today's Sale - <strong>{output}</strong></h4>
              <div className='divider'></div>
                <table className='striped responsive'>
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th>Item Price</th>
                      <th>Item Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>

                  <tbody>
                  {order.map((item)=>{
                      return(
                        <tr>
                          <td>{item.itemName}</td>
                          <td>{item.itemPrice}</td>
                          <td>{}</td>
                          <td>{}</td>
                      </tr>
                    )})}
                    <tr>
                      <td>Total </td>
                      <td></td>
                      <td></td>
                      <td>{order.length>0 ? order.map((item)=>totalPrice = totalPrice + item.itemPrice) : totalPrice}</td>
                    </tr>
                  </tbody>
                </table>
            </div>
          </div>
          <div className='col s12'>
            <div className='todaysSale section'>
              <h4>Sale in last - <strong>7 days</strong></h4>
              <div className='divider'></div>
                <table className='striped responsive'>
                  <thead>
                    <tr>
                      <th>Item Name</th>
                      <th>Item Price</th>
                      <th>Item Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>

                  <tbody>
                  {order.map((item)=>{
                      return(
                        <tr>
                          <td>{item.itemName}</td>
                          <td>{item.itemPrice}</td>
                          <td>{}</td>
                          <td>{}</td>
                      </tr>
                    )})}
                    <tr>
                      <td>Total </td>
                      <td></td>
                      <td></td>
                      <td>{order.length>0 ? order.map((item)=> totalPrice = totalPrice + item.itemPrice) : totalPrice}</td>
                    </tr>
                  </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
      </>
  );
  }

  export default ViewOrder;