import { Link } from 'react-router-dom'
import logo from '../assets/Logo.png'

function Header() {
  return (
    <div className="sticky top-0 bg-stone-900 text-white">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3" >
                <Link to='/' className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src={logo} alt="Coursify Logo" />
                <span className="text-5xl font-bold font-['Arimo'] tracking-[6px]">COURSIFY</span>
                </Link>
            <ul className="flex gap-3 font-bold font-['Arimo'] tracking-[2px]">
                <Link to='/'>
                    <li>Home</li>
                </Link>
                <Link to='/login'>
                    <li>Login</li>
                </Link>
                <Link to='/register'>
                    <li>Register</li>
                </Link>
            </ul>
        </div>
    </div>
  )
}

export default Header