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
  const menu = [ {itemName:'sandwich',itemPrice:30},
                {itemName:'coffee',itemPrice:20},
                {itemName:'poha',itemPrice:20},
                {itemName:'upma',itemPrice:20},
                {itemName:'tea',itemPrice:10},
                {itemName:'breadButterJam',itemPrice:20}
              ]

  let [order,setOrder] = useState({
    todayOrders : [],
    tenMinuteOrders : [],
    prevWeekOrders : []
  })

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
          order= []
          setOrder({todayOrders : data.todayOrders,tenMinuteOrders : data.tenMinuteOrders,prevWeekOrders : data.prevWeekOrders})
          M.toast({html: "Retrived Orders Successfully", classes:"#43a047 green darken-1"})
        }
      }
      catch(error){
        console.log(error)
      }

  }

  useEffect(()=>{
    getOrders();
  },[])

  let todayOrdersData = [];

  if(order.todayOrders.length>0){
    todayOrdersData = order.todayOrders.map((singleOrder)=>{
      return(
        <tr>
          <td>{singleOrder.orderedBy}</td>
          <td>{singleOrder.poha || singleOrder.upma || singleOrder.tea || singleOrder.coffee || singleOrder.breadButterJam || singleOrder.sandwich }</td>
          <td>{singleOrder.orderedBy}</td>
          <td>{singleOrder.orderedBy}</td>
          <td>{singleOrder.orderedBy}</td>
        </tr>
      )
    })
  }

  console.log(todayOrdersData)

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
                    {todayOrdersData}
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