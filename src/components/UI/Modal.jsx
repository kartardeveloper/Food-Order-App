import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ children, open, ...props }) {
  const dialogRef = useRef();

  useEffect(() => {
    const modal = dialogRef.current;
    if (open) {
      modal.showModal();
    }

    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialogRef} {...props}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}

export default Modal;
