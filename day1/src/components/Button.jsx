import * as React from 'react';
import Button from '@mui/material/Button';

const Button_component = ({name, onclick, style, disabled}) => {
  return (
    <Button variant='contained' onClick={()=>onclick()} style={style} disabled= {disabled}>{name}</Button>
  )
}

export default Button_component
