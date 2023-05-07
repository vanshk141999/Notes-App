import { Link } from "react-router-dom";

const NoteItem = ({ note }) => {
  const { id, title, date } = note;
  return (
    <Link to={`/edit-note/${id}`} className="note">
      <h4>
        {title.length > 50 ? note.title.substr(0, 50) + "..." : note.title}
      </h4>
      <p>{date}</p>
    </Link>
  );
};

export default NoteItem;
