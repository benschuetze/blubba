import {
  IonButton,
  IonButtons,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
  IonInput,
  IonContent,
  IonLabel,
  IonTextarea,
} from "@ionic/react";
import { useRef } from "react";

const AddGroupModal = () => {
  const inputStyle = {
    "--padding-start": "10px",
    "--padding-end": "10px",
    "--border-radius": "8px",
    "--border": "2px solid white",
    "--background": "#f0f0f0",
    "--height": "10%",
    "--color": "black",
  };

  const textareaStyle = {
    ...inputStyle,
    "--height": "30%", // You can adjust the height as needed
    "--resize": "none",
  };

  const modal = useRef<HTMLIonModalElement>(null);
  const nameInput = useRef<HTMLIonInputElement>(null);
  const descriptionInput = useRef<HTMLIonTextareaElement>(null);

  return (
    <IonModal trigger="open-add-group-modal" ref={modal}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => modal.current?.dismiss()}>
              Cancel
            </IonButton>
          </IonButtons>

          <IonButtons slot="end">
            <IonButton strong={true} onClick={() => confirm()}>
              Create
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div>
          <IonLabel>Name</IonLabel>
          <IonInput
            style={inputStyle}
            id="custom-input"
            labelPlacement="stacked"
            ref={nameInput}
          ></IonInput>
        </div>
        <div>
          <IonLabel>Description</IonLabel>
          <IonTextarea
            style={textareaStyle}
            ref={descriptionInput}
            placeholder="Enter your description..."
          ></IonTextarea>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default AddGroupModal;
