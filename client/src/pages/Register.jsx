import React, { useState } from 'react'
// import '../styles/Register.css'
import {useNavigate } from 'react-router-dom'

import { useAuth } from '../../store/auth'

import '../styles/Register.css'
function Register() {
    const navigate = useNavigate();
    const [user,setUser] = useState({
        username:"",
        email:"",
        password:""
    })
    const {storeToken} = useAuth();

    const handleInput = (e) =>{
        let name=e.target.name;
        let value = e.target.value;
        // console.log(name+value);
        // console.log(e);
        setUser({
            ...user,
            [name]:value,
        });
    }

    const submitForm=async (e)=>{
        e.preventDefault();
        console.log(user);
        try{
            const response = await fetch(`http://localhost:8000/register`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(user),
            })
            console.log(response);
            if(!response.ok){
                setUser({
                    username:"",
                    email:"",
                    password:""
                })
                
            }
            else{
                storeToken(res_data.token)
                navigate("/login")
            }
        }
        catch(err){
            console.log(err);
        }
    }
    




  return (
    <>
    <section>
        <main>
            <div >
                <div className='container-register'>
                    <div className="registration-image">
                        <img src="https://st.depositphotos.com/1008768/3377/i/450/depositphotos_33777219-stock-photo-register-here-sign.jpg" alt="image" width={500} height={500}/>
                    </div>
                    <div>
                        <h1>Registration Name</h1>
                        <br />
                        <form onSubmit={submitForm}>
                            <div className=''>
                                <label htmlFor="username">Username</label>
                                <input type="text" name='username' placeholder='username' required id='username' value={user.username} onChange={handleInput}/>
                            </div>
                            <div>
                                <label htmlFor="email">email</label>
                                <input type="email" name='email' placeholder='email' required id='email' value={user.email} onChange={handleInput} />
                            </div>
                            <div>
                                <label htmlFor="password">password</label>
                                <input type="password" name='password' placeholder='password' required id='password' value={user.password} onChange={handleInput}/>
                            </div>
                            <br />
                            <button type='submit'>Register Now</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </section>
    </>
  )
}

export default Register