// components/ConfirmDeleteModal/ConfirmDeleteModal.tsx
import Modal from "../Modal/Modal";
import { useModalContext } from "../../../context/ModalContext";
import "./ConfirmDeleteModal.scss";

type ConfirmDeleteModalProps = {
  message: string;
  onConfirm: () => void;
};

const ConfirmDeleteModal = ({ message, onConfirm }: ConfirmDeleteModalProps) => {
  const { setState } = useModalContext();

  return (
    <Modal>
      <p className="confirm__message">{message}</p>
      <div className="confirm__actions">
        <button className="confirm__btn confirm__btn--danger" onClick={onConfirm}>
          Sí
        </button>
        <button className="confirm__btn" onClick={() => setState(false)}>
          Cerrar
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;