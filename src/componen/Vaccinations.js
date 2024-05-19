import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Header from "./Header";


const Vaccinations=()=>{

    const [spot, setSpot] = useState([]);
    const [vaccine, setVaccine] = useState([]);

    const navigate = useNavigate([]);
    const location = useLocation([]);

    useEffect(()=>{
        if (sessionStorage.getItem('token') === null) {
            navigate('/')
        }else{
            getSpot()
        }
    }, [])

    const getSpot=()=>{

        fetch('http://127.0.0.1:8000/api/v1/spots?token='+sessionStorage.getItem('token'),{
                method : 'GET',
                headers : {
                    'Content-Type' : 'Application/json',
                }
        })
        .then(data=>data.json())
        .then(Response=>{
            
            setSpot(Response.spot)
            console.log(Response.spot);
            
            Response.spot.map((data)=>{
                const asArray = Object.entries(data.available_vaccines);
                const filtered = asArray.filter(([key,value])=> value===true);
                const setVaccines = Object.fromEntries(filtered);

                setVaccine( vaccine => [...vaccine, Object.keys(setVaccines).toString()] )

            })
        })
    }

    const reqVaccine = (srv,id)=>{

        navigate('/spotvaccination', {state:{id}})

    }

    return (
        <div>
            <Header/>
            <main>
                <header class="jumbotron">
                    <div class="container">
                        {
                            (()=>{
                                if(location.state.e == 1){
                                    return <h1 class="display-4">First Vaccination</h1>
                                }else{
                                    return <h1 class="display-4">Seconds Vaccination</h1>
                                }
                            })()
                        }
                        
                    </div>
                </header>
                <div class="container mb-5">
                    <div class="section-header mb-4">
                        <h4 class="section-title text-muted font-weight-normal">List Vaccination Spots in Central Jakarta</h4>
                    </div>
                    <div class="section-body">
                        {
                            spot.map((data,index)=>(
                                
                                        <>
                                        {
                                            (()=>{
                                                if(data.serve === location.state.e || data.serve === 3){
                                                    return(
                                                        <article class="spot">
                                                            <div class="row">
                                                                <div class="col-5">
                                                                    <h5 class="text-primary" onClick={()=>reqVaccine(data.serve,data.id)}>{data.name}</h5>
                                                                    <span class="text-muted">{data.address}</span>
                                                                </div>
                                                                <div class="col-4">
                                                                    <h5>Available vaccines</h5>
                                                                    <span class="text-muted">{vaccine[index]}</span>
                                                                </div>
                                                                <div class="col-3">
                                                                    <h5>Serve</h5>
                                                                    <span class="text-muted">
                                                                    {
                                                                        (()=>{
                                                                            if (data.serve === 1) {
                                                                                return "Only first vaccination"
                                                                            }else if (data.serve === 2){
                                                                            return "Only second vaccination"
                                                                            }else if (data.serve === 3){
                                                                                return "Both vaccination"
                                                                            }
                                                                        })()
                                                                    }
                                                                </span>
                                                                </div>
                                                            </div>
                                                        </article>
                                                    )
                                                }else{
                                                    return(
                                                        <article class="spot unavailable">
                                                            <div class="row">
                                                                <div class="col-5">
                                                                    <h5 class="text-primary">{data.name}</h5>
                                                                    <span class="text-muted">{data.address}</span>
                                                                </div>
                                                                <div class="col-4">
                                                                    <h5>Available vaccines</h5>
                                                                    <span class="text-muted">{vaccine[index]}</span>
                                                                </div>
                                                                <div class="col-3">
                                                                    <h5>Serve</h5>
                                                                    <span class="text-muted">
                                                                    {
                                                                        (()=>{
                                                                            if (data.serve === 1) {
                                                                                return "Only first vaccination"
                                                                            }else if (data.serve === 2){
                                                                            return "Only second vaccination"
                                                                            }else if (data.serve === 3){
                                                                                return "Both vaccination"
                                                                            }
                                                                        })()
                                                                    }
                                                                </span>
                                                                </div>
                                                            </div>
                                                        </article>
                                                    )
                                                }

                                            })()
                                        }
                                            
                                        </>
                                    
                                
                            ))
                        }
                    </div>
                </div>
            </main>
        </div>
    )
}
export default Vaccinations;