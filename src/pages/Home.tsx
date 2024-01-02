import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "./Home.css";
import GroupList from "../components/GroupList";
import AddGroupModal from "../components/AddGroupModal";
import AddButton from "../components/AddButton";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blubba</IonTitle>
          </IonToolbar>
        </IonHeader>
        <GroupList />
        <AddGroupModal />
      </IonContent>
      <AddButton openID={"open-add-group-modal"} />
    </IonPage>
  );
};

export default Home;
