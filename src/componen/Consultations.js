import React, { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const Consultation=()=>{

    const[disease_history,setDisease] = useState("")
    const[current_symptoms,setCurrent] = useState("")

    const[value1,setValue1] = useState([])
    const[value2,setValue2] = useState([])


    const navigate = useNavigate([])

    const reqConsul=async(e)=>{
        e.preventDefault()
        
        fetch('http://127.0.0.1:8000/api/v1/consultations?token='+sessionStorage.getItem('token'), {
            method : 'POST',
            headers : {
                'Content-Type' : 'Application/json'
            },
            body : JSON.stringify({disease_history, current_symptoms})
        })
        .then(data=>data.json())
        .then(Response=>{
            if (Response.message === "Request consultation sent successful") {
                alert('Request consultation sent successful');
                navigate('/dashboard')
            }else{
                alert('Request consultation failed');
            }
        })
    }

    return (
        <div>
            <Header/>
            <main>
                <header class="jumbotron">
                    <div class="container">
                        <h1 class="display-4">Request Consultation</h1>
                    </div>
                </header>

                <div class="container">

                    <form action="" onSubmit={reqConsul}>
                        <div class="row mb-4">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <div class="d-flex align-items-center mb-3">
                                        <label for="disease-history" class="mr-3 mb-0">Do you have disease history ?</label>
                                        <select class="form-control-sm" onChange={(e)=>{
                                            setValue1(e.target.value)
                                            if (e.target.value === "no") {
                                                setDisease("")
                                            }
                                        }}>
                                            <option value="yes">Yes, I have</option>
                                            <option value="no" selected>No</option>
                                        </select>
                                    </div>
                                    {
                                        (()=>{
                                            if (value1 === "yes") {
                                                return(
                                                    <textarea id="disease-history" onChange={e=>setDisease(e.target.value)} class="form-control" cols="30" rows="10" placeholder="Describe your disease history"></textarea>
                                                )
                                            }
                                        })()
                                    }
                                </div>
                            </div>
                        </div>

                        <div class="row mb-4">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <div class="d-flex align-items-center mb-3">
                                        <label for="current-symptoms" class="mr-3 mb-0">Do you have symptoms now ?</label>
                                        <select class="form-control-sm" onChange={(e)=>{
                                            setValue2(e.target.value)
                                            if (e.target.value === "no") {
                                                setCurrent("")
                                            }
                                        }}>
                                            <option value="yes">Yes, I have</option>
                                            <option value="no"selected>No</option>
                                        </select>
                                    </div>
                                    {
                                        (()=>{
                                            if (value2 === "yes") {
                                                return(
                                                    <textarea id="current-symptoms" onChange={e=>setCurrent(e.target.value)} class="form-control" cols="30" rows="10" placeholder="Describe your current symptoms"></textarea>
                                                )
                                            }
                                        })()
                                    }
                                </div>
                            </div>
                        </div>

                        <button class="btn btn-primary" type="submit">Send Request</button>
                    </form>

                </div>

            </main>

        </div>
    )
}
export default Consultation;