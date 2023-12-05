import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";

const AddGroupButton = () => {
  return (
    <IonFab slot="fixed" horizontal="end" vertical="bottom">
      <IonFabButton id="open-add-group-modal">
        <IonIcon icon={add}></IonIcon>
      </IonFabButton>
    </IonFab>
  );
};

export default AddGroupButton;
