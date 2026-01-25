import React, { ReactNode, MouseEventHandler, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

interface ButtonAsButton extends ButtonBaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  href?: never;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

interface ButtonAsAnchor extends ButtonBaseProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  href: string;
  onClick?: never;
}

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  className = '',
  ...props
}: ButtonProps) => {
  const classes = `btn btn-${variant} btn-${size} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...props as AnchorHTMLAttributes<HTMLAnchorElement>}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes} {...props as ButtonHTMLAttributes<HTMLButtonElement>}>
      {children}
    </button>
  );
};

export default Button;