import { useParams, useHistory } from "react-router-dom";
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

interface RouteParams {
  id: string;
}

interface Idea {
  created_at: Date;
  group_id: string;
  id: string;
  text: string;
  user_id: string;
  title: string;
}

const GroupPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [ideas, setIdeas] = useState<Array<Idea>>([]);

  const history = useHistory();

  const { id: groupID }: RouteParams = useParams();

  const getGroupData = async () => {
    try {
      const { data } = await supabase.from("groups").select().eq("id", groupID);

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
        .eq("group_id", groupID);

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
        const creationDateObject = new Date(idea.created_at);
        const year = creationDateObject.getFullYear();
        const month = String(creationDateObject.getMonth() + 1).padStart(
          2,
          "0"
        );

        const day = String(creationDateObject.getDate()).padStart(2, "0");

        const creationDate = `${day}.${month}.${String(year).slice(-2)}`;

        return (
          <IonCard
            key={idea.id}
            onClick={() => {
              history.push(`./${groupID}/${idea.id}`, idea);
              history.go(0);
            }}
          >
            <IonCardHeader>
              <IonCardTitle>{idea.title || "No Title"}</IonCardTitle>
              <IonCardSubtitle style={{ textTransform: "none" }}>
                Benny
              </IonCardSubtitle>
              <IonCardSubtitle style={{ marginLeft: "auto" }}>
                {creationDate}
              </IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>{idea.text}</IonCardContent>
          </IonCard>
        );
      })}
      <AddButton openID={"open-add-idea-modal"} />
      <AddIdeaModal groupID={groupID} />
    </div>
  );
};

export default GroupPage;
