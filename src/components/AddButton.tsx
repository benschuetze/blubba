import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";

const AddButton = ({ openID }) => {
  return (
    <IonFab slot="fixed" horizontal="end" vertical="bottom">
      <IonFabButton id={openID}>
        <IonIcon icon={add}></IonIcon>
      </IonFabButton>
    </IonFab>
  );
};

export default AddButton;
