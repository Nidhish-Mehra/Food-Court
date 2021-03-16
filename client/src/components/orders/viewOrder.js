import { useState,useEffect } from 'react'
import M from 'materialize-css'
import { CircularProgress } from '@material-ui/core';


function ViewOrder() {

  const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
  const dateObj = new Date();
  const month = monthNames[dateObj.getMonth()];
  const day = String(dateObj.getDate()).padStart(2, '0');
  const year = dateObj.getFullYear();

  const output = month  + '\n'+ day  + ',' + year;

  let itemQuantityTen=0 ;
  let itemPriceTen=0 ;
  let itemTotalTen=0 ;
  let itemQuantityToday=0 ;
  let itemPriceToday=0 ;
  let itemTotalToday=0 ;
  let itemQuantityWeek=0 ;
  let itemPriceWeek=0 ;
  let itemTotalWeek=0 ;
  let finalTotalTen = 0
  let finalQuantityTen = 0
  let finalTotalToday = 0
  let finalQuantityToday = 0
  let finalTotalWeek = 0
  let finalQuantityWeek = 0
  let itemOrderedBy = ''

  const [order,setOrder] = useState({
    todayOrders : [],
    tenMinuteOrders : [],
    prevWeekOrders : []
  })

  const [menu,setMenu] = useState([])
  const [loading,setLoading] = useState(false)

  const getOrders = async()=>{
      try{
            setLoading(true)
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
              setOrder({todayOrders : data.todayOrders,tenMinuteOrders : data.tenMinuteOrders,prevWeekOrders : data.prevWeekOrders})
              M.toast({html: "Retrived Orders Successfully", classes:"#43a047 green darken-1"})
            }
        getMenuItems()
        setLoading(false)
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
    getOrders();
    const intervalId = setInterval(async()=>{
      setLoading(true)
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
        setOrder({todayOrders : data.todayOrders,tenMinuteOrders : data.tenMinuteOrders,prevWeekOrders : data.prevWeekOrders})
      }
      setLoading(false)
      console.log("Orders fetched")
    },3000)

    return(()=>{
      clearInterval(intervalId)
    })
  },[])

  return (
      <>
      <div className='container'>
        <div className='row'>
          <div className='col s12'>
              <div className='recentOrders section'>
                <h4>Orders in last - <strong>10 minutes</strong>
                {loading?<CircularProgress />:''}
                </h4>
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

                  {menu.map((menuItem,index)=>{
                    finalTotalTen = finalTotalTen + itemTotalTen
                    finalQuantityTen = finalQuantityTen + itemQuantityTen
                    itemQuantityTen=0;
                    itemPriceTen=0;
                    itemTotalTen=0;
                    return(
                      <tr key={index}>
                        <td>{menuItem}</td>
                          {order.tenMinuteOrders.map((item)=>{
                            item.orderDetails.map((component)=>{
                              if(component.itemName === menuItem){
                                itemQuantityTen = itemQuantityTen + component.itemQuantity
                                itemPriceTen = component.itemPrice
                                itemTotalTen = itemQuantityTen*itemPriceTen
                              }
                            });
                          }
                          )
                          }
                        <td>{itemOrderedBy}</td>
                        <td>{itemQuantityTen}</td>
                        <td>{itemPriceTen?itemPriceTen:'-'}</td>
                        <td>{itemTotalTen}</td>
                      </tr>
                    )
                  })}
                    <tr>
                      <td>Total </td>
                      <td></td>
                      <td>{finalQuantityTen+itemQuantityTen}</td>
                      <td></td>
                      <td>{finalTotalTen+itemTotalTen}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
          </div>
          <div className='col s12'>
            <div className='todaysSale section'>
              <h4>Today's Sale - <strong>{output}</strong>
              {loading?<CircularProgress />:''}</h4>
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

                  {menu.map((menuItem,index)=>{
                    finalTotalToday = finalTotalToday + itemTotalToday
                    finalQuantityToday = finalQuantityToday + itemQuantityToday
                    itemQuantityToday=0;
                    itemPriceToday=0;
                    itemTotalToday=0;
                    return(
                      <tr key={index}>
                        <td>{menuItem}</td>
                          {order.todayOrders.map((item)=>{
                            item.orderDetails.map((component)=>{
                              if(component.itemName === menuItem){
                                itemQuantityToday = itemQuantityToday + component.itemQuantity
                                itemPriceToday = component.itemPrice
                                itemTotalToday = itemQuantityToday*itemPriceToday
                              }
                            })
                          })
                          }
                        <td>{itemQuantityToday}</td>
                        <td>{itemPriceToday?itemPriceToday:'-'}</td>
                        <td>{itemTotalToday}</td>
                      </tr>
                    )
                  })}
                    <tr>
                      <td>Total </td>
                      <td>{finalQuantityToday+itemQuantityToday}</td>
                      <td></td>
                      <td>{finalTotalToday+itemTotalToday}</td>
                    </tr>
                  </tbody>
                </table>
            </div>
          </div>
          <div className='col s12'>
            <div className='todaysSale section'>
              <h4>Sale in last - <strong>7 days</strong>
              {loading?<CircularProgress />:''}</h4>
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
                  {menu.map((menuItem,index)=>{
                    finalTotalWeek = finalTotalWeek + itemTotalWeek
                    finalQuantityWeek = finalQuantityWeek + itemQuantityWeek
                    itemQuantityWeek=0;
                    itemPriceWeek=0;
                    itemTotalWeek=0;
                    return(
                      <tr key={index}>
                        <td>{menuItem}</td>
                          {order.prevWeekOrders.map((item)=>{
                            item.orderDetails.map((component)=>{
                              if(component.itemName === menuItem){
                                itemQuantityWeek = itemQuantityWeek + component.itemQuantity
                                itemPriceWeek = component.itemPrice
                                itemTotalWeek = itemQuantityWeek*itemPriceWeek
                              }
                            })
                          })
                          }
                        <td>{itemQuantityWeek}</td>
                        <td>{itemPriceWeek?itemPriceWeek:'-'}</td>
                        <td>{itemTotalWeek}</td>
                      </tr>
                    )
                  })}
                    <tr>
                      <td>Total </td>
                      <td>{finalQuantityWeek+itemQuantityWeek}</td>
                      <td></td>
                      <td>{finalTotalWeek+itemTotalWeek}</td>
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