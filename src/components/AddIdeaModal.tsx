import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonContent,
  IonInput,
  IonTextarea,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { supabase } from "../../supabase";

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

import { useRef } from "react";
const AddIdeaModal = ({ groupID }) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const descriptionInput = useRef<HTMLIonTextareaElement>(null);

  const history = useHistory();

  const addIdea = async () => {
    const ideaText = descriptionInput.current?.value;

    if (ideaText) {
      const { data, error } = await supabase
        .from("ideas")
        .insert({ text: ideaText, group_id: groupID })
        .select();
      console.log("data: ", { data, error });
      if (!error) {
        modal.current?.dismiss();
        history.go(0);
      }
    }
  };

  return (
    <IonModal trigger="open-add-idea-modal" ref={modal}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => modal.current?.dismiss()}>
              Cancel
            </IonButton>
          </IonButtons>

          <IonButtons slot="end">
            <IonButton strong={true} onClick={() => addIdea()}>
              Add Idea
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div>
          <IonTextarea
            style={textareaStyle}
            ref={descriptionInput}
            placeholder="Describe your idea shortly..."
            autoGrow={true}
            counter={true}
            maxlength={500}
          ></IonTextarea>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default AddIdeaModal;
