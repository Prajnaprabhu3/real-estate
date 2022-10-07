import { Link } from "react-router-dom";
import Logo from '../components/Logo'
import Button from "./Button";
import { navLinks } from './navLinks'
import '../styles/Navbar.css'

const Navbar = () => {
  return (
  <header className="flex items-center justify-between p-6 px-10 max-full  bg-white drop-shadow-md ">
    <div className="flex items-center space-x-24">
<Logo/>
    

    <div className={`hidden md:inline-flex items-center cursor-pointer text-gray-500 font-bold text-medium navLinkWrapper `}>
    {navLinks.map((link, index) => {
        return (   
          <div id={index} className={`flex space-x-10 justify-between ${link.active ? "bg-violet-200 rounded px-2 py-1 text-violet-500" : ""}  `}>
              <Link href={link.src} className="hover:text-violet-500" >
            <p className="flex space-x-4 ">{link.title}</p>
            </Link>  
          </div>
        );
      })}
    </div>
    </div>


    <div className="flex items-center justify-between navbarButtons ">
    <div className="mr-3">  <Button buttonText="Login" customClass="login"/></div>
      <Button buttonText="Sign up" customClass="signup" />
    </div>


</header>
  )
}

export default Navbar


