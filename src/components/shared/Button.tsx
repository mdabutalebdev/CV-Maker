import React from 'react';

 
interface IntButton {
    children: React.ReactNode,
    onClick?: () => void,
    className?: string,
    type?: 'button' | 'submit' | 'reset',
    disabled?: boolean
}

const Button = ({
    children, 
    onClick, 
    className, 
    disabled = false, 
    type = "button"
}: IntButton) => {
    
 
    const defaultStyles = 
      "bg-primary text-white font-normal px-6 py-2  cursor-pointer  rounded-[6px] ";
 
    const finalClasses = `${defaultStyles} ${className || ''}`;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={finalClasses}  
        >
            {children}
        </button>
    )
}

export default Button