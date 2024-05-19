import React, { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const Login=()=>{


    const[id_card_number,setId] = useState([])
    const[password,setPass] = useState([])

    const navigate = useNavigate([])

    const auth=async(e)=>{
        e.preventDefault()

        fetch('http://127.0.0.1:8000/api/v1/auth/login', {
            method : 'POST',
            headers : {
                'Content-Type' : 'Application/json'
            },
            body : JSON.stringify({id_card_number, password})
        })
        .then(data=>data.json())
        .then(Response=>{
            if (Response.message === "ID Card Number or Password Incorrect") {
                alert('ID Card Number or Password Incorrect');
            }else{
                navigate('/dashboard')
                sessionStorage.setItem('token', Response.login_tokens)
                sessionStorage.setItem('id_card_number', id_card_number)
                sessionStorage.setItem('password', password)
                sessionStorage.setItem('name', Response.name)
            }
        })
    }
    return (
        <div>
            <Header/>
            <main>
                <header class="jumbotron">
                    <div class="container text-center">
                        <h1 class="display-4">Vaccination Platform</h1>
                    </div>
                </header>

                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-6">
                            <form class="card card-default" onSubmit={auth}>
                                <div class="card-header">
                                    <h4 class="mb-0">Login</h4>
                                </div>
                                <div class="card-body">
                                    <div class="form-group row align-items-center">
                                        <div class="col-4 text-right">ID Card Number</div>
                                        <div class="col-8"><input type="text" onChange={e=>setId(e.target.value)} class="form-control"/></div>
                                    </div>
                                    <div class="form-group row align-items-center">
                                        <div class="col-4 text-right">Password</div>
                                        <div class="col-8"><input type="password" onChange={e=>setPass(e.target.value)} class="form-control"/></div>
                                    </div>
                                    <div class="form-group row align-items-center mt-4">
                                        <div class="col-4"></div>
                                        <div class="col-8"><button class="btn btn-primary" type="submit">Login</button></div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )

}
export default Login;