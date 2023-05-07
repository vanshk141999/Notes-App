import { Link, useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import useCreateDate from "../components/useCreateDate";

const EditNote = ({ notes, setNotes }) => {
  const { id } = useParams();
  const note = notes.find((item) => item.id === id);
  const [title, setTitle] = useState(note.title);
  const [details, setDetails] = useState(note.details);
  const date = useCreateDate();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (title && details) {
      const updatedNote = { ...note, title, details, date };
      const newNotes = notes.map((item) => {
        if (item.id === id) {
          item = updatedNote;
        }
        return item;
      });
      setNotes(newNotes);
      // Redirect to the Home Page
      navigate("/");
    }
  }

  function handleDelete(params) {
    if (window.confirm("Are you sure you want to delete this note?")) {
      const newNotes = notes.filter((item) => item.id !== id);
      setNotes(newNotes);
      // Redirect to the Home Page
      navigate("/");
    }
  }

  return (
    <section>
      <header className="create-note__header">
        <Link to="/" className="btn">
          <IoIosArrowBack />
        </Link>
        <button className="btn lg primary" onClick={handleSubmit}>
          Save
        </button>
        <button className="btn lg danger" onClick={handleDelete}>
          <RiDeleteBin6Line />
        </button>
      </header>
      <form onSubmit={handleSubmit} className="create-note__form">
        <input
          type="text"
          placeholder="Title"
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows={28}
          placeholder="Note Details..."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        ></textarea>
      </form>
    </section>
  );
};

export default EditNote;
