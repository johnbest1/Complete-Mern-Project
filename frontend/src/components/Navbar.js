import { Link } from 'react-router-dom'
import useAuthContext from '../hooks/useAuthContext'
import useLogout from '../hooks/useLogout'

const Navbar = () => {
    const { user } = useAuthContext()
    const { logout } = useLogout()
    const handleClick = () => {
        logout()
    }
    return (
        <div className="navbar">
            <Link to='/'><h1>Workout Buddy</h1></Link>
            <nav>
                {user && (
                    <div>
                        <span>{user.email}</span>
                        <Link to='/login' onClick={handleClick}>Logout</Link>
                    </div>
                )}
                {!user && (
                    <div>
                        <Link to='/login'>Login</Link>
                        <Link to='/signup'>Signup</Link>
                    </div>
                )}
            </nav>
        </div>
    );
}

export default Navbar;