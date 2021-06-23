import React from 'react'
import { ButtonHTMLAttributes } from 'react';
import '../styles/button.scss';

// type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return (
    <button className='button' {...props} />
  );
};

export default Button
