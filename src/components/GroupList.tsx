import { IonItem, IonList, IonLabel } from "@ionic/react";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { useHistory } from "react-router";

export const GroupList = () => {
  const history = useHistory();
  const [groupsOfUser, setGroupsOfUser] = useState([]);

  const getUserData = async () => {
    try {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      const userID = userData.user?.id;

      if (userError) {
        console.error("Supabase Error, process cancelled: ", userError);
        return;
      }

      const { data, error } = await supabase
        .from("groups")
        .select()
        .or(`creator.eq.${userID}`, `members.array.contains.${userID}`);

      if (error) {
        console.error("Supabase Error, process cancelled: ", error);
        return;
      }
      setGroupsOfUser(data);
    } catch (e) {
      console.error("Unexpected Database Error: ", e);
    }
  };

  const goToGroup = async (group) => {
    console.log("Open Group: ", group);
    history.push(`./groups/${group.id}`);
    // force reload to go to group page
    history.go(0);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <IonList>
        {groupsOfUser.map((group, index) => {
          return (
            <IonItem key={index} onClick={() => goToGroup(group)}>
              <IonLabel>{group.title}</IonLabel>
            </IonItem>
          );
        })}
      </IonList>
    </div>
  );
};

export default GroupList;
