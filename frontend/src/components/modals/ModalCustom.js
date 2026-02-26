import Modal from 'react-bootstrap/Modal';
import ButtonCustom from '../buttons/ButtonCustom';

function ModalCustom({
  show,
  onHide,
  title,
  children,
  closeLabel = 'Fechar',
  primaryLabel,
  onPrimary,
  primaryVariant = 'primary',
  size,
  centered,
  footerContent,
  className,
  ...rest
}) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size={size}
      centered={centered}
      className={className}
      {...rest}
    >
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        {footerContent !== undefined ? (
          footerContent
        ) : (
          <>
            <ButtonCustom variant="secondary" onClick={onHide}>
              {closeLabel}
            </ButtonCustom>
            {primaryLabel && (
              <ButtonCustom variant={primaryVariant} onClick={onPrimary}>
                {primaryLabel}
              </ButtonCustom>
            )}
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCustom;
