import React, { useEffect, useState } from "react";
import Header from "./Header";

import { useNavigate } from "react-router-dom";


const Dashboard=()=>{

    const[consul,setConsul] = useState([])
    const[vaccine,setVaccine] = useState([])

    const navigate = useNavigate([])

    let statusVac = false;

    useEffect(()=>{
        if (sessionStorage.getItem('token') === null || sessionStorage.getItem('token') === undefined) {
            navigate('/')
        }else{
            Promise.all([
                fetch('http://127.0.0.1:8000/api/v1/consultations?token='+sessionStorage.getItem('token'), {
                    method : 'GET',
                    headers : {
                        'Content-Type' : 'Application/json'
                    },
                }).then(data1=>data1.json()),

                fetch('http://127.0.0.1:8000/api/v1/vaccinations?token='+sessionStorage.getItem('token'), {
                    method : 'GET',
                    headers : {
                        'Content-Type' : 'Application/json'
                    },
                }).then(data2=>data2.json())

            ]).then(([resconsul,resvaccine])=>{
                setConsul(resconsul)
                setVaccine(resvaccine.vaccinations)
                console.log(resconsul);
                console.log(resvaccine);
            })
        }
    }, [])

    const register=async(e)=>{
        navigate('/vaccination', {state:{e}})
    }

    return(
        <div>
            <Header/>
            <main>
                <header class="jumbotron">
                    <div class="container">
                        <h1 class="display-4">Dashboard</h1>
                    </div>
                </header>
                <div class="container">
                <section class="consultation-section mb-5">
                    <div class="section-header mb-3">
                        <h4 class="section-title text-muted">My Consultation</h4>
                    </div>
                    <div class="row">
                        {
                            (()=>{
                                if (consul.id === undefined) {
                                    return(
                                        <div class="col-md-4">
                                            <div class="card card-default">
                                                <div class="card-header">
                                                    <h5 class="mb-0">Consultation</h5>
                                                </div>
                                                <div class="card-body">
                                                    <a href="/consultation">+ Request consultation</a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }else{
                                    return(
                                        <div class="col-md-4">
                                            <div class="card card-default">
                                                <div class="card-header border-0">
                                                    <h5 class="mb-0">Consultation</h5>
                                                </div>
                                                <div class="card-body p-0">
                                                    <table class="table table-striped mb-0">
                                                        <tr>
                                                            <th>Status</th>
                                                            <td><span class="badge badge-info">{consul.status}</span></td>
                                                        </tr>
                                                        <tr>
                                                            <th>Disease History</th>
                                                            <td class="text-muted">{consul.disease_history===null?'-':consul.disease_history}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Current Symptoms</th>
                                                            <td class="text-muted">{consul.current_symptoms===null?'-':consul.current_symptoms}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Doctor Name</th>
                                                            <td class="text-muted">{
                                                                (()=>{
                                                                    if (typeof consul.doctor === 'object' && consul.doctor !== null) {
                                                                        return consul.doctor.name
                                                                    }
                                                                })()
                                                            }</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Doctor Notes</th>
                                                            <td class="text-muted">{consul.doctor_notes===null?'-':consul.doctor_notes}</td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            })()
                        }
                    </div>
                </section>
                <section class="consultation-section mb-5">
                    <div class="section-header mb-3">
                        <h4 class="section-title text-muted">My Vaccinations</h4>
                    </div>
                    <div class="section-body">
                        <div class="row mb-4">
                            {
                                (()=>{
                                    if (consul.status !== "accepted") {
                                        return(
                                            <div class="col-md-12">
                                                <div class="alert alert-warning">
                                                    Your consultation must be approved by doctor to get the vaccine.
                                                </div>
                                            </div>
                                        )
                                    }else{
                                        if (vaccine.first !== null) {
                                            return(
                                                <div class="col-md-4">
                                                    <div class="card card-default">
                                                        <div class="card-header border-0">
                                                            <h5 class="mb-0">First Vaccination</h5>
                                                        </div>
                                                        <div class="card-body p-0">
                                                            <table class="table table-striped mb-0">
                                                                <tr>
                                                                    <th>Status</th>
                                                                    {
                                                                        (()=>{
                                                                            if (vaccine.first.vaccines !== null) {
                                                                                statusVac = true
                                                                                return <td class="text-muted"><span class="badge badge-primary">Vaccined</span></td> 
                                                                            }else{
                                                                                return <td class="text-muted"><span class="badge badge-info">Registered</span></td> 
                                                                            }                                                                                         
                                                                        })()
                                                                    }
                                                                </tr>
                                                                <tr>
                                                                    <th>Date</th>
                                                                    <td class="text-muted">{vaccine.first.date}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Spot</th>
                                                                    <td class="text-muted">{vaccine.first.spots===null?'-':vaccine.first.spots.name}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Vaccine</th>
                                                                    <td class="text-muted">{vaccine.first.vaccines===null?'-':vaccine.first.vaccines.name}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Vaccinator</th>
                                                                    <td class="text-muted">{vaccine.first.doctor===null?'-':vaccine.first.doctor.name}</td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div> 

                                            )
                                        }else{
                                            return(
                                                <div class="col-md-4">
                                                    <div class="card card-default">
                                                        <div class="card-header border-0">
                                                            <h5 class="mb-0">First Vaccination</h5>
                                                        </div>
                                                        <div class="card-body">
                                                            <a href="/vaccination" onClick={()=>register(1)}>+ Register vaccination</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    }
                                })()
                            }
                            {
                                (()=>{
                                    if (statusVac === true) {
                                        if (typeof vaccine.second === 'object' && vaccine.second !== null) {
                                            return(
                                                <div class="col-md-4">
                                                    <div class="card card-default">
                                                        <div class="card-header border-0">
                                                            <h5 class="mb-0">Second Vaccination</h5>
                                                        </div>
                                                        <div class="card-body p-0">
                                                            <table class="table table-striped mb-0">
                                                                <tr>
                                                                    <th>Status</th>
                                                                    {
                                                                        (()=>{
                                                                            if (vaccine.second.vaccines !== null) {
                                                                                
                                                                                return <td class="text-muted"><span class="badge badge-primary">Vaccined</span></td> 
                                                                            }else{
                                                                                return <td class="text-muted"><span class="badge badge-info">Registered</span></td> 
                                                                            }                                                                                         
                                                                        })()
                                                                    }
                                                                </tr>
                                                                <tr>
                                                                    <th>Date</th>
                                                                    <td class="text-muted">{vaccine.second.date}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Spot</th>
                                                                    <td class="text-muted">{vaccine.second.spots===null?'-':vaccine.second.spots.name}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Vaccine</th>
                                                                    <td class="text-muted">{vaccine.second.vaccines===null?'-':vaccine.second.vaccines.name}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Vaccinator</th>
                                                                    <td class="text-muted">{vaccine.second.doctor===null?'-':vaccine.second.doctor.name}</td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div> 
                                            )
                                        }else{
                                            return(
                                                <div class="col-md-4">
                                                    <div class="card card-default">
                                                        <div class="card-header border-0">
                                                            <h5 class="mb-0">Second Vaccination</h5>
                                                        </div>
                                                        <div class="card-body">
                                                            <a href="/vaccination" onClick={()=>register(2)}>+ Register vaccination</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    }
                                })()
                            }
                        </div>
                    </div>
                </section>
                </div>
            </main>
        </div>
    )
}
export default Dashboard;