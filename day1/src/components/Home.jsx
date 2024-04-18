import React from 'react'
import Button_component from './Button'
import {Link, Outlet} from 'react-router-dom'

import Stack from '@mui/material/Stack';

const Home = () => {
  return (
    <div className='Home'>
      <Stack spacing={4} >
      <Link to='/signup'><Button_component name="signup" onclick={()=>{}}/></Link>
      <Link to='/login'><Button_component name = "login" onclick={()=>{}}/></Link>

      </Stack>
      
    </div>
  )
}

export default Home
