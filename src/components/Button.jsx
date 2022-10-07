import '../styles/Button.css'

const Button = ({buttonText, onClick, prefixLogo, customClass}) => {
  return (
   <div onClick={onClick} className={`flex  py-1.5 px-3.5 rounded-md navbarButton text-white font-bold text-sm cursor-pointer button ${customClass}`}>
    {prefixLogo}
    {buttonText}
   </div>
  )
}

export default Button