import Carousel from 'react-bootstrap/Carousel';

function CarouselCustom({ items = [], interval = 5000, className, ...rest }) {
  return (
    <Carousel interval={interval} className={className} {...rest}>
      {items.map((item, index) => (
        <Carousel.Item key={index}>
          {item.image && (
            <img
              className="d-block w-100"
              src={item.image}
              alt={item.alt || item.title || `Slide ${index + 1}`}
            />
          )}
          {(item.title || item.caption) && (
            <Carousel.Caption>
              {item.title && <h3>{item.title}</h3>}
              {item.caption && <p>{item.caption}</p>}
            </Carousel.Caption>
          )}
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselCustom;
