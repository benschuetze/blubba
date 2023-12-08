import {
  IonButton,
  IonButtons,
  IonHeader,
  IonModal,
  IonToolbar,
  IonInput,
  IonContent,
  IonLabel,
  IonTextarea,
  IonDatetime,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useRef } from "react";
import { supabase } from "../../supabase";
import { error } from "console";

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
  "--height": "100vh",
  "--resize": "none",
};

const AddGroupModal = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const nameInput = useRef<HTMLIonInputElement>(null);
  const descriptionInput = useRef<HTMLIonTextareaElement>(null);
  const dateInput = useRef<HTMLIonDatetimeElement>(null);

  const history = useHistory();

  const createGroup = async () => {
    const date = dateInput.current?.value;
    const name = nameInput.current?.value;
    const description = descriptionInput.current?.value;

    if (date && description && name) {
      const { data, error } = await supabase
        .from("groups")
        .insert({ title: name, description: description, dueDate: date })
        .select();
      console.log("HAllo was geht denn  hier ab, ", data);
      if (!error) {
        modal.current?.dismiss();
        history.push(`./groups/${data[0].id}`);
        // force reload to go to group page
        history.go(0);
      }
    }
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
          ></IonTextarea>
        </div>
        <div>
          <IonLabel>Due Date</IonLabel>
          <IonDatetime ref={dateInput}></IonDatetime>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default AddGroupModal;
