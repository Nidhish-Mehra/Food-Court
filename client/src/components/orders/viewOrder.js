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
  let totalPrice=0 ;

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
          setOrder((prevState)=>{
              return [...prevState,data]
          });
          M.toast({html: "Retrived Successfully", classes:"#43a047 green darken-1"})
          console.log(data)
        }
      }
      catch(error){
        console.log(error)
      }
  }

  useEffect(()=>{
    getMenuItems();
    getOrders();
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
                        <th>Item Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>

                    <tbody>
                    {order.tenMinuteOrders.length>0 && order.tenMinuteOrders.map((item)=>{
                      return(
                          item.orderDetails.map((component)=>{
                            return(
                              <tr key={Date.now()}>
                                <td>{item.orderedBy}</td>
                                <td>{component.itemName}</td>
                                <td>{component.itemQuantity}</td>
                                <td>{component.itemPrice}</td>
                                <td>{item.orderTotal}</td>
                              </tr>
                            )
                            })
                    )})}
                    <tr>
                      <td>Total </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>{order.length>0 ? order.map((item)=>totalPrice = totalPrice + item.orderTotal) : totalPrice}</td>
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
                      <th>Customer Name</th>
                      <th>Item Name</th>
                      <th>Item Quantity</th>
                      <th>Item Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>

                  <tbody>
                  {order.todayOrders.length>0 && order.todayOrders.map((item)=>{
                      return(
                          item.orderDetails.map((component)=>{
                            return(
                              <tr key={Date.now()}>
                                <td>{item.orderedBy}</td>
                                <td>{component.itemName}</td>
                                <td>{component.itemQuantity}</td>
                                <td>{component.itemPrice}</td>
                                <td>{item.orderTotal}</td>
                              </tr>
                            )
                            })
                    )})}
                    <tr>
                      <td>Total </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>{order.length>0 ? order.map((item)=>totalPrice = totalPrice + item.orderTotal) : totalPrice}</td>
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
                    <th>Customer Name</th>
                      <th>Item Name</th>
                      <th>Item Quantity</th>
                      <th>Item Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>

                  <tbody>
                  {order.prevWeekOrders.length>0 && order.prevWeekOrders.map((item)=>{
                      return(
                          item.orderDetails.map((component)=>{
                            return(
                              <tr key={Date.now()}>
                                <td>{item.orderedBy}</td>
                                <td>{component.itemName}</td>
                                <td>{component.itemQuantity}</td>
                                <td>{component.itemPrice}</td>
                                <td>{item.orderTotal}</td>
                              </tr>
                            )
                            })
                    )})}
                    <tr>
                      <td>Total </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>{order.length>0 ? order.map((item)=>totalPrice = totalPrice + item.orderTotal) : totalPrice}</td>
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