import {
  IonContent,
  IonItem,
  IonCard,
  IonCardContent,
  IonList,
  IonLabel,
  IonInput,
  IonButton,
  IonFooter,
  IonToolbar,
  IonTitle,
  IonHeader,
  IonPage,
  IonIcon,
} from "@ionic/react";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../../supabase";
import { heart, heartOutline } from "ionicons/icons";

type Idea = {
  id: number;
  user_id: number;
  text: string;
  group_id: number;
  created_at: string;
  title: string;
  comments: Array<string>;
  likes: Array<any>;
};

const IdeaPage: React.FC = () => {
  const location = useLocation();
  const ideaData: Idea = location.state;

  const [comments, setComments] = useState(
    ideaData.comments.length > 0 ? ideaData : []
  );
  const [likes, setLikes] = useState(
    ideaData.likes.length > 0 ? ideaData.likes : []
  );
  const [likedByUser, setLikedByUser] = useState(false);
  const [userID, setUserID] = useState(null);

  const inputRef = useRef<HTMLIonInputElement>(null);

  const getAndSetComments = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const response = await supabase
        .from("ideas")

        .select()
        .eq("id", ideaData.id);

      const currentUserID = user?.id;
      if (currentUserID) {
        setUserID(currentUserID);
      }

      const existingComments = response.data?.[0].comments || [];

      const likes = response.data?.[0].likes;
      const isLikedByUser = likes.some((like) => like.user_id === userID);

      setComments(existingComments);
      setLikedByUser(isLikedByUser);
    } catch (e) {
      console.error("Error while getting message data: ", e);
    }
  };

  const handleLike = async () => {
    let newLikes;

    if (likedByUser) {
      newLikes = likes.filter((like) => like.user_id !== userID);
    } else {
      newLikes = [
        ...likes,
        {
          user_id: userID,
          user_name: "Fred",
        },
      ];
    }

    setLikedByUser(!likedByUser);

    const { data, error } = await supabase
      .from("ideas")
      .update({
        likes: newLikes,
      })
      .eq("id", ideaData.id)
      .select();

    if (error) {
      console.log("error while liking: ", error);
      return;
    }

    setLikes(data[0].likes);
  };

  const handleSendMessage = async () => {
    const newComment = {
      message: inputRef.current?.value,
      creator: ideaData.user_id,
      creator_name: "Adolf Hitler",
    };

    try {
      const { data, error } = await supabase
        .from("ideas")
        .update({ comments: [...comments, newComment] })
        .eq("id", ideaData.id);
    } catch (e) {
      console.error("Error while sending message: ", e);
    }
  };

  const handleUpdates = (payload) => {
    const newComments = payload.new.comments;
    setComments(newComments);
    console.log("Change received!", payload);
  };

  supabase
    .channel("ideas")
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "ideas" },
      handleUpdates
    )
    .subscribe();

  useEffect(() => {
    getAndSetComments();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Header</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" fullscreen>
        {/* Idea Card */}
        <IonCard>
          <IonCardContent>
            <h1>{ideaData.title || "No Title"}</h1>
            <span>IDEEN GIBTS HIER WOW</span>
            {/* Add other idea details here */}
            <IonIcon
              icon={likedByUser ? heart : heartOutline}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                color: likedByUser && "red",
              }}
              onClick={handleLike}
            ></IonIcon>
          </IonCardContent>
        </IonCard>

        {/* Chat Messages as Cards */}
        <div style={{ flex: 1, overflowY: "auto", paddingBottom: "50px" }}>
          <IonList className="ion-no-padding" lines="none">
            {comments.map((comment, index) => (
              <div style={{ marginBottom: "8px" }} key={index}>
                <IonItem className="ion-no-margin">
                  <IonCard className="ion-no-margin">
                    <IonCardContent>
                      <IonLabel>{comment.message}</IonLabel>
                    </IonCardContent>
                  </IonCard>
                </IonItem>
              </div>
            ))}
          </IonList>
        </div>

        {/* Chat Input Field */}
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonInput
            ref={inputRef}
            className="ion-padding"
            placeholder="Chat about the idea..."
            value={""}
          ></IonInput>
          <IonButton expand="full" onClick={handleSendMessage}>
            Send
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default IdeaPage;
