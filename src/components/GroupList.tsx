import { IonItem, IonList, IonLabel } from "@ionic/react";
import AddButton from "./AddButton";

export const GroupList = () => {
  return (
    <div>
      <IonList>
        <IonItem>
          <IonLabel>Pokémon Yellow</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Pokémon Yellow</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Pokémon Yellow</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Pokémon Yellow</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Pokémon Yellow</IonLabel>
        </IonItem>
      </IonList>
      <AddButton openID={"open-add-group-modal"} />
    </div>
  );
};

export default GroupList;
