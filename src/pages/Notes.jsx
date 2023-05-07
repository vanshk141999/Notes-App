import { CiSearch } from "react-icons/ci";
import { MdClose } from "react-icons/md";
import { BsPlusLg } from "react-icons/bs";
import { Link } from "react-router-dom";
import NoteItem from "../components/NoteItem";
import { useEffect, useState } from "react";

const Notes = ({ notes }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredNotes, setFilteredNotes] = useState(notes);

  const handleSearch = () => {
    setFilteredNotes(
      notes.filter((note) => {
        if (note.title.toLowerCase().match(searchText.toLocaleLowerCase())) {
          return note;
        }
      })
    );
  };

  useEffect(() => handleSearch(), [searchText]);

  return (
    <section>
      <header className="notes__header">
        {!showSearch && <h2>My Notes</h2>}
        {showSearch && (
          <input
            type="text"
            autoFocus
            placeholder="Keyword..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              handleSearch();
            }}
          />
        )}
        <button
          className="btn"
          onClick={() => setShowSearch((prevShowSearch) => !prevShowSearch)}
        >
          {showSearch ? <MdClose /> : <CiSearch />}
        </button>
      </header>
      <div className="notes__container">
        {filteredNotes.length === 0 && (
          <p className="empty__notes">No notes found</p>
        )}
        {filteredNotes.map((note) => {
          return <NoteItem key={note.id} note={note} />;
        })}
      </div>
      <Link to="/create-note" className="btn add__btn">
        <BsPlusLg />
      </Link>
    </section>
  );
};

export default Notes;
