import React from 'react'
import Button_component from './Button'
import { useLocation, useNavigate } from 'react-router-dom'

const Error = () => {
    const navigate= useNavigate();
    const location = useLocation();
    console.log(location);
  return (
    <div>
      <div>You have used wrong <h3>{location.state.error}</h3></div>
      <div>Click here to go to homePage</div>
      <Button_component name="Home" onclick={()=>navigate('/user')}/>
    </div>
  )
}

export default Error
