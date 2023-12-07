import { ISODateString } from "@capacitor/core";
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
  IonDatetime,
} from "@ionic/react";
import { useRef } from "react";

const inputStyle = {
  "--padding-start": "10px",
  "--padding-end": "10px",
  "--border-radius": "8px",
  "--border": "2px solid white",
  "--background": "#f0f0f0",

  "--color": "black",
  marginBottom: "16px",
};

const textareaStyle = {
  ...inputStyle,
  "--height": "100vh", // You can adjust the height as needed
  "--resize": "none",
};

const AddGroupModal = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const nameInput = useRef<HTMLIonInputElement>(null);
  const descriptionInput = useRef<HTMLIonTextareaElement>(null);
  const dateInput = useRef<HTMLIonDatetimeElement>(null);

  let date: Date;
  let name: string;
  let description: string;

  const handleOnChange = (e: CustomEvent, variableToSet: string) => {
    if (variableToSet === "name") name = e.detail.value;
    if (variableToSet === "date") date = e.detail.value;
    if (variableToSet === "description") description = e.detail.value;
  };

  const createGroup = () => {
    console.log("VALUES: ", { date, name, description });
  };

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
            <IonButton strong={true} onClick={() => createGroup()}>
              Create
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div>
          <IonInput
            style={inputStyle}
            id="custom-input"
            labelPlacement="stacked"
            ref={nameInput}
            placeholder="Who is the lucky person?"
            onIonChange={(e) => handleOnChange(e, "name")}
          ></IonInput>
        </div>
        <div>
          <IonTextarea
            style={textareaStyle}
            ref={descriptionInput}
            placeholder="What is the occasion?"
            autoGrow={true}
            counter={true}
            maxlength={300}
            onIonChange={(e) => handleOnChange(e, "description")}
          ></IonTextarea>
        </div>
        <div>
          <IonLabel>Due Date</IonLabel>
          <IonDatetime
            ref={dateInput}
            onIonChange={(e) => handleOnChange(e, "date")}
          ></IonDatetime>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default AddGroupModal;
