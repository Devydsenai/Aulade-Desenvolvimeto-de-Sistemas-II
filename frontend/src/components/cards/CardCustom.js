import Card from 'react-bootstrap/Card';
import ButtonCustom from '../buttons/ButtonCustom';

function CardCustom({
  title,
  text,
  image,
  imageAlt,
  buttonText,
  onButtonClick,
  buttonVariant = 'primary',
  children,
  style,
  className,
  ...rest
}) {
  return (
    <Card style={style} className={className} {...rest}>
      {image && <Card.Img variant="top" src={image} alt={imageAlt || title} />}
      <Card.Body>
        {title && <Card.Title>{title}</Card.Title>}
        {text && <Card.Text>{text}</Card.Text>}
        {children}
        {buttonText && (
          <ButtonCustom variant={buttonVariant} onClick={onButtonClick}>
            {buttonText}
          </ButtonCustom>
        )}
      </Card.Body>
    </Card>
  );
}

export default CardCustom;
