import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";
import GroupList from "../components/GroupList";
import AddGroupModal from "../components/AddGroupModal";

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
    </IonPage>
  );
};

export default Home;
