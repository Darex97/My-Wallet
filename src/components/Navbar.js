import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './Navbar.scss'

const Navbar = (props) => {
   
    const name = props.name;
    const history = useHistory();
    const logout = (e) => {
        
        localStorage.clear();
        history.push('/login');
      }
   
    return ( 
        
        <nav className="navbar">
            <h1> MyWallet</h1>

            <div className="groupForLogut">
                <div className='profil'>{name} </div>
                <div className='logout' onClick={logout}>LogOut </div>
            </div>
        </nav>
     );
}
 
export default Navbar;