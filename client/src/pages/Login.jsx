import React,{useState} from 'react'
import '../styles/Login.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../store/auth'

function Login() {
    const [user,setUser] = useState({
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
        })
    }
    const navigate=useNavigate();

    const submitForm=async (e)=>{
        e.preventDefault();
        console.log(user);
        try{
            const response = await fetch(`http://localhost:8000/login`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(user),
            })
            console.log(response);
            if(response.ok){
                const res_data=await response.json();
                console.log("REspone",res_data);
                storeToken(res_data.token)
                alert("Sucess")
                setUser({
                    email:"",
                    password:""
                })
                navigate('/')

            }
            else{
                alert("tryAgain")
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
            <div>
                <div className='login-container'>
                    <div  >
                        <img src="https://www.shutterstock.com/shutterstock/photos/2080680922/display_1500/stock-vector-click-here-red-button-with-hand-cursor-button-with-hand-pointer-clicking-click-here-banner-with-2080680922.jpg" alt="" width={400} height={200} />
                    </div>
                    <div>
                        <h1>Login Form</h1>
                        <form onSubmit={submitForm}>
                            <div>
                                <label htmlFor="email">email</label>
                                <input type="text" name='email' placeholder='email' required id='email' value={user.email} onChange={handleInput} />
                            </div>
                            <div>
                                <label htmlFor="password">password</label>
                                <input type="password" name='password' placeholder='password' required id='password' value={user.password} onChange={handleInput}/>
                            </div>
                            <br />
                            <button type='submit'>Login Now</button>
                        </form>

                    </div>
                </div>
            </div>
        </main>
    </section>
    </>
  )
}

export default Login;