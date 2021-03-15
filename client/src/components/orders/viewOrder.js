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
  let itemQuantity=0 ;
  let itemPrice=0 ;
  let itemTotal=0 ;
  let finalTotal = 0
  let finalQuantity = 0
  let finalTotalToday = 0
  let finalQuantityToday = 0

  const [order,setOrder] = useState({
    todayOrders : [],
    tenMinuteOrders : [],
    prevWeekOrders : []
  })

  const [menu,setMenu] = useState([])

  const getOrders = async()=>{
      try{
        const res = await fetch("/getOrders",{
          method:"get",
          headers:{
            "Content-Type":"application/json"
          }
        })
        const data = await res.json()
        console.log(data)
        if(data.error){
          M.toast({html:data.error, classes:"#c62828 red darken-3"})
        }
        else{
          setOrder({todayOrders : data.todayOrders,tenMinuteOrders : data.tenMinuteOrders,prevWeekOrders : data.prevWeekOrders})
          M.toast({html: "Retrived Orders Successfully", classes:"#43a047 green darken-1"})
        }
      }
      catch(error){
        console.log(error)
      }
  }

  const getMenuItems =async ()=>{
    try{
         const response = await fetch('/getMenuItems')
         const data = await response.json()
         if(data.error){
             M.toast({html:data.error, classes:'#c62828 red darken-3'})
         }
         else{
            const newMenu  = data.map((item) => item.itemName)
            setMenu(newMenu);
            M.toast({html: 'Retrived Menu Items Successfully', classes:'#43a047 green darken-1'})
         }
     }catch(error){
         console.log(error)
     }
 }

  useEffect(()=>{
    getOrders()
    getMenuItems()
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
                      <th>Item Name</th>
                      <th>Customer Name</th>
                      <th>Item Quantity</th>
                      <th>Item Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>

                  <tbody>

                  {menu.map((menuItem)=>{
                    finalTotalToday = finalTotalToday + itemTotal
                    finalQuantityToday = finalQuantityToday + itemQuantity
                    itemQuantity=0;
                    itemPrice=0;
                    itemTotal=0;
                    return(
                      <tr key={Date.now()}>
                        <td>{menuItem}</td>
                          {order.tenMinuteOrders.map((item)=>{
                            item.orderDetails.map((component)=>{
                              if(component.itemName == menuItem){
                                itemQuantity = itemQuantity + component.itemQuantity
                                itemPrice = itemPrice + component.itemPrice
                                itemTotal = itemQuantity*itemPrice
                              }
                            });
                            return(<td>{item.orderedBy}</td>)
                          })
                          }
                        <td>{itemQuantity}</td>
                        <td>{itemPrice}</td>
                        <td>{itemTotal}</td>
                      </tr>
                    )
                  })}
                    <tr>
                      <td>Total </td>
                      <td></td>
                      <td>{finalQuantityToday+itemQuantity}</td>
                      <td></td>
                      <td>{finalTotalToday+itemTotal}</td>
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
                      <th>Item Quantity</th>
                      <th>Item Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>

                  <tbody>

                  {menu.map((menuItem)=>{
                    finalTotalToday = finalTotalToday + itemTotal
                    finalQuantityToday = finalQuantityToday + itemQuantity
                    itemQuantity=0;
                    itemPrice=0;
                    itemTotal=0;
                    return(
                      <tr key={Date.now()}>
                        <td>{menuItem}</td>
                          {order.todayOrders.map((item)=>{
                            item.orderDetails.map((component)=>{
                              if(component.itemName == menuItem){
                                itemQuantity = itemQuantity + component.itemQuantity
                                itemPrice = itemPrice + component.itemPrice
                                itemTotal = itemQuantity*itemPrice
                              }
                            })
                          })
                          }
                        <td>{itemQuantity}</td>
                        <td>{itemPrice}</td>
                        <td>{itemTotal}</td>
                      </tr>
                    )
                  })}
                    <tr>
                      <td>Total </td>
                      <td>{finalQuantityToday+itemQuantity}</td>
                      <td></td>
                      <td>{finalTotalToday+itemTotal}</td>
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
                      <th>Item Quantity</th>
                      <th>Item Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>

                  <tbody>
                  {menu.map((menuItem)=>{
                    finalTotal = finalTotal + itemTotal
                    finalQuantity = finalQuantity + itemQuantity
                    itemQuantity=0;
                    itemPrice=0;
                    itemTotal=0;
                    return(
                      <tr key={Date.now()}>
                        <td>{menuItem}</td>
                          {order.prevWeekOrders.map((item)=>{
                            item.orderDetails.map((component)=>{
                              if(component.itemName == menuItem){
                                itemQuantity = itemQuantity + component.itemQuantity
                                itemPrice = itemPrice + component.itemPrice
                                itemTotal = itemQuantity*itemPrice
                              }
                            })
                          })
                          }
                        <td>{itemQuantity}</td>
                        <td>{itemPrice}</td>
                        <td>{itemTotal}</td>
                      </tr>
                    )
                  })}
                    <tr>
                      <td>Total </td>
                      <td>{finalQuantity+itemQuantity}</td>
                      <td></td>
                      <td>{finalTotal+itemTotal}</td>
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