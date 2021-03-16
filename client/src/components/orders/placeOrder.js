import { useState,useEffect } from 'react';
import M from 'materialize-css'

function PlaceOrder() {
    const [loading,setLoading] = useState(false)
    const [menu,setMenu] = useState([])
    const [order,setOrder] = useState([])
    const [value,setValue] = useState(0)
    const [orderedBy,setOrderedBy] = useState('noUser')
    const [sandwich,setSandwich] = useState(0)
    const [coffee,setCoffee] = useState(0)
    const [poha,setPoha] = useState(0)
    const [upma,setUpma] = useState(0)
    const [tea,setTea] = useState(0)
    const [breadButterJam,setBreadButterJam] = useState(0)
    const orderDetails = []
    let total = 0
    const submitOrder = async()=>{
        try{
            setLoading(true)
            if(sandwich){
                total = total + sandwich * 30
                orderDetails.push({
                    itemName:'Sandwich',
                    itemPrice:30,
                    itemQuantity:sandwich
                })
            }
            if(coffee){
                total = total + coffee * 20
                orderDetails.push({
                    itemName:'Coffee',
                    itemPrice:20,
                    itemQuantity:coffee
                })
            }
            if(tea){
                total = total + tea * 10
                orderDetails.push({
                    itemName:'Tea',
                    itemPrice:10,
                    itemQuantity:tea
                })
            }
            if(upma){
                total = total + upma * 20
                orderDetails.push({
                    itemName:'Upma',
                    itemPrice:20,
                    itemQuantity:upma
                })
            }
            if(poha){
                total = total + poha * 20
                orderDetails.push({
                    itemName:'Poha',
                    itemPrice:20,
                    itemQuantity:poha
                })
            }
            if(breadButterJam){
                total = total + breadButterJam * 20
                orderDetails.push({
                    itemName:'Bread Butter Jam',
                    itemPrice:20,
                    itemQuantity:breadButterJam
                })
            }

            const res = await fetch('/createOrder',{
                method:'post',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    orderedBy:orderedBy,
                    orderDetails:orderDetails,
                    total:total,
                })
            })
            const data = await res.json()
            if(data.error){
                M.toast({html:data.error, classes:'#c62828 red darken-3'})
            }
            else{
                M.toast({html: 'Order Created Successfully', classes:'#43a047 green darken-1'})
            }
            setSandwich(0)
            setPoha(0)
            setUpma(0)
            setBreadButterJam(0)
            setTea(0)
            setCoffee(0)
            setLoading(false)
            console.log(orderDetails,total)
        }catch(error){
            console.log(error)
        }
    }

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='row section'>
                        <h4>Customer Details</h4>
                        <div className='divider'></div>
                        <div className='input-field col s12'>
                            <label htmlFor='itemName'>Customer Name</label>
                            <input
                                required
                                id='itemName'
                                type='text'
                                onChange={(e)=>{setOrderedBy(e.target.value)}}
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
                        <div className="row">
                            <div className="col s12 m12 l6">
                                <div style={{padding:"20px",textAlign:"center"}} className="card">
                                    <span style={{margin:"5px"}} className="card-title">Bread Butter Jam</span>
                                    <span style={{margin:"5px"}} className="card-title">₹20</span>
                                    <span style={{marginLeft:"100px"}} className="card-title">Pcs. {breadButterJam}</span>
                                    <a className="btn-floating halfway-fab red left">
                                        <i className="material-icons"
                                            onClick={()=>{
                                                if(breadButterJam>0){
                                                    setBreadButterJam(breadButterJam-1)
                                                }
                                                }}>
                                                arrow_drop_down
                                        </i>
                                    </a>
                                    <a className="btn-floating halfway-fab green">
                                        <i className="material-icons" onClick={()=>{setBreadButterJam(breadButterJam+1)}}>arrow_drop_up</i>
                                    </a>
                                </div>
                            </div>
                            <div className="col s12 m12 l6">
                                <div style={{padding:"20px",textAlign:"center"}} className="card">
                                    <span style={{margin:"5px"}} className="card-title">Coffee</span>
                                    <span style={{margin:"5px"}} className="card-title">₹20</span>
                                    <span style={{marginLeft:"100px"}} className="card-title">Pcs. {coffee}</span>
                                    <a className="btn-floating halfway-fab red left">
                                        <i className="material-icons"
                                            onClick={()=>{
                                                if(coffee>0){
                                                    setCoffee(coffee-1)
                                                }
                                                }}>
                                                arrow_drop_down
                                        </i>
                                    </a>
                                    <a className="btn-floating halfway-fab green">
                                        <i className="material-icons" onClick={()=>{setCoffee(coffee+1)}}>arrow_drop_up</i>
                                    </a>
                                </div>
                            </div>

                            </div>
                        <div className="row">
                            <div className="col s12 m12 l6">
                                <div style={{padding:"20px",textAlign:"center"}} className="card">
                                    <span style={{margin:"5px"}} className="card-title">Poha</span>
                                    <span style={{margin:"5px"}} className="card-title">₹20</span>
                                    <span style={{marginLeft:"100px"}} className="card-title">Pcs. {poha}</span>
                                    <a className="btn-floating halfway-fab red left">
                                        <i className="material-icons"
                                            onClick={()=>{
                                                if(poha>0){
                                                    setPoha(poha-1)
                                                }
                                                }}>
                                                arrow_drop_down
                                        </i>
                                    </a>
                                    <a className="btn-floating halfway-fab green">
                                        <i className="material-icons" onClick={()=>{setPoha(poha+1)}}>arrow_drop_up</i>
                                    </a>
                                </div>
                            </div>
                            <div className="col s12 m12 l6">
                                <div style={{padding:"20px",textAlign:"center"}} className="card">
                                    <span style={{margin:"5px"}} className="card-title">Sandwich</span>
                                    <span style={{margin:"5px"}} className="card-title">₹30</span>
                                    <span style={{marginLeft:"100px"}} className="card-title">Pcs. {sandwich}</span>
                                    <a className="btn-floating halfway-fab red left">
                                        <i className="material-icons"
                                            onClick={()=>{
                                                if(sandwich>0){
                                                    setSandwich(sandwich-1)
                                                }
                                                }}>
                                                arrow_drop_down
                                        </i>
                                    </a>
                                    <a className="btn-floating halfway-fab green">
                                        <i className="material-icons" onClick={()=>{setSandwich(sandwich+1)}}>arrow_drop_up</i>
                                    </a>
                                </div>
                            </div>

                            </div>
                        <div className="row">
                            <div className="col s12 m12 l6">
                                <div style={{padding:"20px",textAlign:"center"}} className="card">
                                    <span style={{margin:"5px"}} className="card-title">Tea</span>
                                    <span style={{margin:"5px"}} className="card-title">₹10</span>
                                    <span style={{marginLeft:"100px"}} className="card-title">Pcs. {tea}</span>
                                    <a className="btn-floating halfway-fab red left">
                                        <i className="material-icons"
                                            onClick={()=>{
                                                if(tea>0){
                                                    setTea(tea-1)
                                                }
                                                }}>
                                                arrow_drop_down
                                        </i>
                                    </a>
                                    <a className="btn-floating halfway-fab green">
                                        <i className="material-icons" onClick={()=>{setTea(tea+1)}}>arrow_drop_up</i>
                                    </a>
                                </div>
                            </div>
                            <div className="col s12 m12 l6">
                                <div style={{padding:"20px",textAlign:"center"}} className="card">
                                    <span style={{margin:"5px"}} className="card-title">Upma</span>
                                    <span style={{margin:"5px"}} className="card-title">₹20</span>
                                    <span style={{marginLeft:"100px"}} className="card-title">Pcs. {upma}</span>
                                    <a className="btn-floating halfway-fab red left">
                                        <i className="material-icons"
                                            onClick={()=>{
                                                if(upma>0){
                                                    setUpma(upma-1)
                                                }
                                                }}>
                                                arrow_drop_down
                                        </i>
                                    </a>
                                    <a className="btn-floating halfway-fab green">
                                        <i className="material-icons" onClick={()=>{setUpma(upma+1)}}>arrow_drop_up</i>
                                    </a>
                                </div>
                            </div>

                            <div className='col s12 l12 center-align'>
                                <button className={loading? 'btn blue large disabled orderPlaceButton':'btn blue large orderPlaceButton'} onClick={()=>submitOrder()}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
  }

  export default PlaceOrder;