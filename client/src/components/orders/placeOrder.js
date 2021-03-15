import { useState,useEffect } from 'react';
import M from 'materialize-css'

function PlaceOrder() {
    //const [menu,setMenu] = useState([])
    //const [order,setOrder] = useState([])
    //const [value,setValue] = useState(0)
    const [orderedBy,setOrderedBy] = useState()
    const [sandwich,setSandwich] = useState(0)
    const [coffee,setCoffee] = useState(0)
    const [poha,setPoha] = useState(0)
    const [upma,setUpma] = useState(0)
    const [tea,setTea] = useState(0)
    const [BreadButterJam,setBreadButterJam] = useState(0)
 
    /*const getMenuItems = async (currentTime)=>{
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
    },[])*/

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


                <div className="row">
                    <div className="col s12 m6">
                        <div style={{padding:"20px",textAlign:"center"}} className="card">
                            <span style={{margin:"5px"}} className="card-title">Sandwich</span>
                            <span style={{margin:"5px"}} className="card-title">₹30</span>
                            <span style={{marginLeft:"100px"}} className="card-title">Pcs. {sandwich}</span>
                            <a className="btn-floating halfway-fab waves-effect waves-light red left">
                                <i className="material-icons" 
                                onClick={()=>{
                                    if(sandwich>0){
                                        setSandwich(sandwich-1)
                                    }
                                    }}>
                                    arrow_drop_down
                                </i>
                            </a>
                            <a className="btn-floating halfway-fab waves-effect waves-light green">
                                <i className="material-icons" onClick={()=>{setSandwich(sandwich+1)}}>arrow_drop_up</i>
                            </a>
                        </div>
                        </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
  }

  export default PlaceOrder;