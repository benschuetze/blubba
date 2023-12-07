import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonLabel,
  IonButton,
} from "@ionic/react";
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

const Login = () => {
  const history = useHistory();
  const [session, setSession] = useState(null);

  const emailInput = useRef<HTMLIonInputElement>(null);
  const passwordInput = useRef<HTMLIonInputElement>(null);

  const handleLogin = async () => {
    const email = emailInput?.current?.value;
    const password = passwordInput?.current?.value;

    const emailString: string = String(email);
    const passwordString: string = String(password);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailString,
        password: passwordString,
      });

      if (error) {
        console.error("Login error:", error.message);
      } else {
        console.log("Login success:", data);
        history.push("/home");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const handleOnChange = (e) => {};

  return (
    <IonContent fullscreen className="ion-padding">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <form>
        <div>
          <IonInput
            style={inputStyle}
            ref={emailInput}
            onIonChange={(e) => handleOnChange(e)}
          ></IonInput>
          <IonLabel className="small-label" position="floating">
            Email
          </IonLabel>
        </div>
        <div style={{ position: "relative" }}>
          <IonInput
            type="password"
            style={inputStyle}
            ref={passwordInput}
          ></IonInput>
          <IonLabel className="small-label" position="floating">
            Password
          </IonLabel>
        </div>
        <IonButton style={{ float: "right" }} onClick={handleLogin}>
          Login
        </IonButton>
      </form>
      <a href="/signup">Create an account</a>
    </IonContent>
  );
};

export default Login;
