import { useEffect, useState, useRef } from "react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonInput,
  IonLabel,
  IonButton,
} from "@ionic/react";
import "./Signup.css";
import { supabase } from "../../supabase";
import { Session } from "@supabase/supabase-js";

const inputStyle = {
  "--padding-start": "10px",
  "--padding-end": "10px",
  "--border-radius": "8px",
  "--border": "2px solid white",
  "--background": "#f0f0f0",
  "--color": "black",
  marginBottom: "32px",
};

const Signup = () => {
  const [session, setSession] = useState<Session | null>(null);

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error("Error fetching session:", error.message);
    } else {
      setSession(data?.session || null);
    }
  };

  const emailInput = useRef<HTMLIonInputElement>(null);
  const passwordInput = useRef<HTMLIonInputElement>(null);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[0-9])(?=.*[A-Z]).{6,}$/;

  const createNewUser = async () => {
    const email = emailInput?.current?.value;
    const password = passwordInput?.current?.value;

    if (email && password) {
      const emailString: string = String(email);
      const passwordString: string = String(password);

      const emailIsValid = emailRegex.test(emailString);
      const passwordIsValid = passwordRegex.test(passwordString);

      if (emailIsValid && passwordIsValid) {
        const { data, error } = await supabase.auth.signUp({
          email: emailString,
          password: passwordString,
        });
        console.log("response data: ", data);
        return data || { error };
      } else {
        let errorMessage =
          "Please enter a valid email and ensure your password has at least 6 characters, a number, and a capitalized letter.";

        if (!emailIsValid && passwordIsValid) {
          errorMessage = "Please enter a valid email address.";
        } else if (!passwordIsValid && emailIsValid) {
          errorMessage =
            "Please use a password that meets the specified criteria.";
        }

        return {
          error: true,
          errorMessage,
        };
      }
    } else {
      return {
        error: true,
        errorMessage: "Please enter both your email address and a password.",
      };
    }
  };

  useEffect(() => {
    getSession();
  }, []);

  if (!session) {
    return (
      <IonContent fullscreen className="ion-padding">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Sign up</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div style={{ position: "relative" }}>
          <IonInput style={inputStyle} ref={emailInput}></IonInput>
          <IonLabel className="small-label" position="floating">
            E-Mail
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
        <IonButton
          className="ion-margin-end"
          style={{ float: "right" }}
          onClick={createNewUser}
        >
          Create Account
        </IonButton>
      </IonContent>
    );
  } else {
    return (
      <div>
        <span>You are already logged in</span>
        <a href="./home">Go Home</a>
      </div>
    );
  }
};

export default Signup;
