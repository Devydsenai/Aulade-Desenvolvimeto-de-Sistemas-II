import Button from 'react-bootstrap/Button';

function ButtonCustom({ variant = 'primary', children, type = 'button', onClick, disabled, className, href, ...rest }) {
  return (
    <Button
      variant={variant}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      href={href}
      {...rest}
    >
      {children}
    </Button>
  );
}

export default ButtonCustom;
