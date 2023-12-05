import { IonItem, IonList, IonLabel } from "@ionic/react";
import AddGroupButton from "./AddGroupButton";

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
      <AddGroupButton />
    </div>
  );
};

export default GroupList;
