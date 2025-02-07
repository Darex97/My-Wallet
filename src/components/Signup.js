import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './Signup.scss'
import  { useState,useEffect } from "react";



const Signup = () => {

    const [namee, setName] = useState('');
    const [surename, setsurename] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [money, setMoney] = useState('');
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const history = useHistory();

    useEffect(() => {

        // Trigger
        validateForm();
    }, [namee, email, password,surename]);

   
    const validateForm = () => {
        let errors = {};

     
        if (!namee) {
            errors.namee = 'Name is required.';
        }
        if (!surename) {
            errors.surename = 'Surename is required.';
        }

        // Validate email field
        if (!email) {
            errors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid.';
        }

        // Validate password field
        if (!password) {
            errors.password = 'Password is required.';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters.';
        }

        // Set the errors and update form validity
        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const name=namee+surename;
        const transactions =[];
        const user = { name, email, password,money ,transactions};
    
        fetch('http://localhost:8000/users/', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user)
        }).then(() => {
          
          history.push('/login');
        })
      }

      const goLogin = (e) => {
        
        history.push('/login');

      }

    return ( 
       
       <div className="signup">

        <div className="form">

            <form className="form" onSubmit={handleSubmit}>
                    <div className="inputContainer">
                        <input
                            type="text"
                            className="input"
                            placeholder="Name"
                            value={namee}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.namee && <p className="error">{errors.namee}</p>}
                    </div>

                    <div className="inputContainer">
                        <input
                            type="text"
                            className="input"
                            placeholder="Surename"
                            value={surename}
                            onChange={(e) => setsurename(e.target.value)}
                        />
                        {errors.surename && <p className="error">{errors.surename}</p>}
                    </div>
                    
                    <div className="inputContainer">
                        <input
                            type="email"
                            className="input"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    
                    <div className="inputContainer">
                        <input
                            type="password"
                            className="input"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>

                    <div className="inputContainer">
                        <input
                            type="number"
                            className="input"
                            placeholder="Money"
                            value={money}
                            onChange={(e) => setMoney(e.target.value)}
                        />
                       
                    </div>
                    
                    <div className="btns">
                        <button
                            type="submit"
                            className={`button${isFormValid ? '' : 'disabled'}`}
                            disabled={!isFormValid}
                        > Submit
                        </button>

                        <button className='button' onClick={goLogin}> 
                            Back
                        </button>

                    </div>
                    
                </form>



        </div>
        

        

        </div>
     );
}
 
export default Signup;