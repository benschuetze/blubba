import { IonModal } from "@ionic/react";
import { useRef } from "react";
const AddIdeaModal = () => {
  const modal = useRef<HTMLIonModalElement>(null);

  return (
    <IonModal trigger="open-add-idea-modal" ref={modal}>
      <div>
        <span>HALLO IDEA MODAL</span>
      </div>
    </IonModal>
  );
};

export default AddIdeaModal;
