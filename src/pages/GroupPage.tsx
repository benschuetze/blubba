import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import AddButton from "../components/AddButton";
import AddIdeaModal from "../components/AddIdeaModal";

const GroupPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { id } = useParams();

  const getGroupData = async () => {
    const { data, error } = await supabase.from("groups").select().eq("id", id);

    if (data?.length === 0) {
      setLoading(false);
      setError(true);
      return;
    }

    setLoading(false);
  };

  console.log("Group Id: ", id);

  useEffect(() => {
    getGroupData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <div>
      <span>Hallo Gruppenmitglied</span>
      <AddButton openID={"open-add-idea-modal"} />
      <AddIdeaModal />
    </div>
  );
};

export default GroupPage;
