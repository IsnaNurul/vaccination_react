import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header=()=>{

    const navigate = useNavigate ([])

    useEffect(()=>{
        if (sessionStorage.getItem('token' === null)) {
            navigate('/')
        }
    })

    const logout=async(e)=>{
        e.preventDefault()
        
        fetch('http://127.0.0.1:8000/api/v1/auth/logout?token='+sessionStorage.getItem('token'), {
            method : 'POST',
            headers : {
                'Content-Type' : 'Application/json'
            },
        })
        .then(data=>data.json())
        .then(Response=>{
            if (Response.message === "Logout success") {
                alert('Logout success');
                navigate('/')
                sessionStorage.clear()
            }else{
                alert('Invalid token');
            }
        })
    }

    return(
        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
            <div class="container">
                <a class="navbar-brand" href="#">Vaccination Platform</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul class="navbar-nav ml-auto">
                        {
                            (()=>{
                                if (sessionStorage.getItem('token') !== null || sessionStorage.getItem('token') !== undefined) {
                                    return(
                                        <>
                                            <li class="nav-item">
                                                <a class="nav-link" href="/#">{sessionStorage.getItem('name')}</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" href="/" style={{ cursor:'pointer' }} onClick={logout}>Logout</a>
                                            </li>
                                        </>
                                    )
                                }else{
                                    return(
                                        <li class="nav-item">
                                            <a class="nav-link" href="#">Login</a>
                                        </li>
                                    )
                                }
                            })()
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Header;