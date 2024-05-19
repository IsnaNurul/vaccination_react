import React, { useEffect, useState } from "react";
import Header from "./Header";
import moment from "moment"

import { useNavigate, useLocation } from "react-router-dom";

const SpotVaccination=()=>{

    const[spot,setSpot] = useState([])
    const[session,setSession] = useState(['09.00 - 11.00', '13.00 - 15.00', '15.00 - 17.00'])
    const[slot,setSlot] = useState([])
    const[date,setTanggal] = useState(moment().format('YYYY-MM-DD'))
    const[available,setAvailable] = useState([])

    const location = useLocation([])

    const navigate = useNavigate([])

    let spot_id = location.state.id

    // let tanggal = "2021-09-01"

    useEffect(()=>{
        if (sessionStorage.getItem('token') === null) {
            navigate('/')
        }else{
            getSpot(date)
        }
    }, [])

    const getSpot=(e)=>{

        fetch('http://127.0.0.1:8000/api/v1/spots/'+spot_id+'?token='+sessionStorage.getItem('token')+'&date='+e,{
                method : 'GET',
                headers : {
                    'Content-Type' : 'Application/json',
                }
        })
        .then(data=>data.json())
        .then(Response=>{
            
            setSpot(Response.spot)
            setAvailable(Response.vaccinations_count)
            setSlot(Math.ceil(Response.spot.capacity/3))
            console.log(Response.spot);
            
        })
    }

    const getDate=(e)=>{
        getSpot(e)
    }

    const reqVaccine=async(e)=>{
        e.preventDefault()
        
        fetch('http://127.0.0.1:8000/api/v1/vaccinations?token='+sessionStorage.getItem('token'), {
            method : 'POST',
            headers : {
                'Content-Type' : 'Application/json'
            },
            body : JSON.stringify({spot_id,date})
        })
        .then(data=>data.json())
        .then(Response=>{
            if (Response.message === "First vaccination registered" || Response.message === "First vaccination registered") {
                alert('Registered vaccination sent successful');
                navigate('/dashboard')
            }else if (Response.message === "Wait at least +30 days for 1st vaccine") {
                alert('Wait at least +30 days for 1st vaccine');
            }else{
                alert('Registered vaccination sent failed');
            }
        })
    }

    return(
        <div>
            <Header/>
            <main>
                <header class="jumbotron">
                    <div class="container d-flex justify-content-between align-items-center">
                        <div>
                            <h1 class="display-4">{spot.name}</h1>
                            <span class="text-muted">{spot.address}</span>
                        </div>
                        <a href="" class="btn btn-primary" onClick={reqVaccine}>Register vaccination</a>
                    </div>
                </header>
                <div class="container">
                    <div class="row mb-3"></div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="vaccination-date">Select vaccination date</label>
                                <input type="date" value={date} onChange={(e)=>{
                                    setTanggal(e.target.value)
                                    getDate(e.target.value)
                                }} class="form-control" id="vaccination-date"/>
                            </div>
                        </div>
                    <div class="row mb-5">
                    {
                            session.map((data,index)=>(
                                <div class="col-md-4">
                                    <div class="card card-default">
                                        <div class="card-body">
                                            <div class="d-flex align-items-center justify-content-between mb-3">
                                                <h4>Session {index+1}</h4>
                                                <span class="text-muted">{data}</span>
                                            </div>
                                            <div>
                                                <div class="row">
                                                    {
                                                        (()=>{
                                                            let rows = []
                                                            let ses = index * slot
                                                            for (let i = 0; i < slot; i++) {
                                                                let blok = i+1+ses
                                                                if (blok <= spot.capacity) {

                                                                    if (blok <= available) {
                                                                        rows.push(
                                                                            <div class="col-4 mb-4">
                                                                                <div class="slot filled"> #{blok} </div>
                                                                            </div>
                                                                        )  
                                                                    }else if (blok <= available+1) {
                                                                        rows.push(
                                                                            <div class="col-4 mb-4">
                                                                                <div class="slot bg-primary text-white"> #{blok} </div>
                                                                            </div>
                                                                        )  
                                                                    }else{
                                                                        rows.push(
                                                                            <div class="col-4 mb-4">
                                                                                <div class="slot"> #{blok} </div>
                                                                            </div>
                                                                        )                                                                                                                                        
                                                                    }
                                                                }
                                                                
                                                            }
                                                            return rows;
                                                        })()
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                ))
                            }
                    </div>
                    </div>
            </main>
        </div>
      
    )
}
export default SpotVaccination;