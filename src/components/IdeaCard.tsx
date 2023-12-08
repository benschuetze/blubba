const IdeaCard = ({ text, id }) => {
  return (
    <div>
      <span>{id}</span>
      <span>{text}</span>
    </div>
  );
};

export default IdeaCard;
