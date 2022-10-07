import { HiSparkles } from 'react-icons/hi'
import '../styles/MainComponent.css'


const Label = () => {
  return (
    <div className="flex items-center text-sm px-2  text-white font-semibold rounded-r label">
        <HiSparkles/> <p className="ml-1">POPULAR</p>
      </div>
  )
}

export default Label