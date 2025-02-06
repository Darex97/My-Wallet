import './Login.scss'
import { useState } from "react";
import { useHistory } from "react-router-dom";
import useFetch from '../hooks/useFetch';



const Login = () => {

    const history = useHistory();

    let dataFromLocalStorage = JSON.parse(localStorage.getItem('id'));
    if(dataFromLocalStorage)
        {
            history.push('/');
        }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { error, isPending, data: users } = useFetch('http://localhost:8000/users/')

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = users.find(u => u.email === email && u.password === password); 
        console.log(user)
        if(user){
            localStorage.setItem('id', JSON.stringify(user.id));
            history.push('/');
        }
        else{
            alert("Wrong password or email")
        }
        
      }


    return (
        <div className="login">
            <div className="myBody"> 
                <div className="wrapper">
                    <i style={{ '--clr': '#8ecae6' }}></i>
                    <i style={{ '--clr': '#219ebc' }}></i>
                    <i style={{ '--clr': '#023047' }}></i>
                    <div className="login">
                        <h2>Login</h2>
                        <input 
                        type="text" 
                        placeholder="Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                        <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                        <input type="submit" value="Sign in" onClick={handleSubmit} />
                        <div className="links">
                            <a href="#">Forget Password</a>
                            <a href="#">Signup</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
