import { useEffect, useState, useRef } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonLabel,
} from "@ionic/react";

const inputStyle = {
  "--padding-start": "10px",
  "--padding-end": "10px",
  "--border-radius": "8px",
  "--border": "2px solid white",
  "--background": "#f0f0f0",

  "--color": "black",
  marginBottom: "16px",
};

const Login = () => {
  const [session, setSession] = useState(null);

  const emailInput = useRef(null);

  const handleOnChange = (e) => {};

  return (
    <IonContent fullscreen>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <div>
        <IonLabel>E-Mail</IonLabel>
        <IonInput
          style={inputStyle}
          id="custom-input"
          labelPlacement="stacked"
          ref={emailInput}
          onIonChange={(e) => handleOnChange(e)}
        ></IonInput>
      </div>
      <a href="/signup">Create an account</a>
    </IonContent>
  );
};

export default Login;
