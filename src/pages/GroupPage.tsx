import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import AddButton from "../components/AddButton";
import AddIdeaModal from "../components/AddIdeaModal";
import IdeaCard from "../components/IdeaCard";

interface RouteParams {
  id: string;
}

interface Idea {
  created_at: Date;

  group_id: string;

  id: string;

  text: string;

  user_id: string;
}

const GroupPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [ideas, setIdeas] = useState<Array<Idea>>([]);

  const { id }: RouteParams = useParams();

  const getGroupData = async () => {
    try {
      const { data } = await supabase.from("groups").select().eq("id", id);

      if (data?.length === 0) {
        setLoading(false);
        setError(true);
        return;
      }
      setLoading(false);
    } catch (e) {
      console.log("ERROR: Error while getting Group Data: ", e);
    }
  };

  const getIdeasForGroup = async () => {
    try {
      const { data, error } = await supabase
        .from("ideas")
        .select()
        .eq("group_id", id);

      if (data) {
        setIdeas(data);
      }
    } catch (e) {
      console.log("ERROR: Request Error: ", e);
    }
  };

  useEffect(() => {
    // only supposed to get data on first render
    if (loading) getGroupData();

    // if user is authorized to fetch he can load the ideas
    if (!error) getIdeasForGroup();
  }, [error]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <div>
      {ideas.map((idea) => {
        return (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Card Title</IonCardTitle>
              <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              Here's a small text description for the card content. Nothing
              more, nothing less.
            </IonCardContent>
          </IonCard>
        );
      })}
      <AddButton openID={"open-add-idea-modal"} />
      <AddIdeaModal groupID={id} />
    </div>
  );
};

export default GroupPage;
