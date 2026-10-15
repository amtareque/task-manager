import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger' | 'quiet'
  children: ReactNode
}

export default function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  return <button className={`button button-${variant} ${className}`.trim()} {...props}>{children}</button>
}
