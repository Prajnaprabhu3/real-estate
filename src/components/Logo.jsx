import { RiHomeSmile2Fill } from 'react-icons/ri'
import '../styles/Logo.css'

const Logo = () => {
  return (
    <div className="flex items-center justify-between align-middle logoWrapper ">
        <RiHomeSmile2Fill className='text-3xl mr-2 logo' />
        <p className='text-xl font-semibold'>Estatery</p>
    </div>
  )
}

export default Logo