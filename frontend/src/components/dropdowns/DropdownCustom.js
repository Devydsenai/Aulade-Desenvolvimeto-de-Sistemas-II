import Dropdown from 'react-bootstrap/Dropdown';

function DropdownCustom({
  title = 'Menu',
  variant = 'primary',
  id = 'dropdown-custom',
  items = [],
  align = 'start',
  className,
  ...rest
}) {
  return (
    <Dropdown align={align} className={className} {...rest}>
      <Dropdown.Toggle variant={variant} id={id}>
        {title}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {items.map((item, index) => (
          <Dropdown.Item
            key={index}
            href={item.href}
            onClick={item.onClick}
            disabled={item.disabled}
          >
            {item.text}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownCustom;
