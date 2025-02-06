import useFetch from "../hooks/useFetch";
import Navbar from "./Navbar";
import './Home.scss'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Home = () => {

    const history = useHistory();
    
    let dataFromLocalStorage = JSON.parse(localStorage.getItem('id'));
    if(!dataFromLocalStorage)
        {
            history.push('/login');
        }


    const { error, isPending, data: user } = useFetch('http://localhost:8000/users/'+dataFromLocalStorage)
    
    return (
      <div className="home">
        { user && <Navbar  name={user.name} />}
        { error && <div>{ error }</div> }
        { isPending && <div className="loading">Loading...</div> }
        {/* { blogs && <BlogList blogs={blogs} /> } */}
      </div>
    );
  }
   
  export default Home;