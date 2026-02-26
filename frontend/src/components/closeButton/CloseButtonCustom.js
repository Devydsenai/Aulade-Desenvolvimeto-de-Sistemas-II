import CloseButton from 'react-bootstrap/CloseButton';

function CloseButtonCustom({ onClick, ariaLabel = 'Fechar', disabled, variant, className, ...rest }) {
  return (
    <CloseButton
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      variant={variant}
      className={className}
      {...rest}
    />
  );
}

export default CloseButtonCustom;
