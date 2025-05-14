import React, { useState } from "react";
import "./App.css";

const AvatarCard = ({ avatar, onEdit }) => (
  <div className="card">
    <img src={avatar.avatar} alt={avatar.first_name} className="avatar-img" />
    <h3>{avatar.first_name} {avatar.last_name}</h3>
    <button className="edit-btn" onClick={() => onEdit(avatar)}>Edit</button>
  </div>
);

const Modal = ({ show, onClose, onCreate }) => {
  const [form, setForm] = useState({ first_name: '', last_name: '', avatar: '' });

  if (!show) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.first_name || !form.last_name || !form.avatar) return;
    onCreate(form);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Create New Avatar</h2>
        <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} />
        <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} />
        <input type="text" name="avatar" placeholder="Image URL" onChange={handleChange} />
        <button className="create-btn" onClick={handleSubmit}>Create</button>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

function App() {
 const [avatars, setAvatars] = useState([
  {
    id: 1,
    first_name: "Liam",
    last_name: "Anderson",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Liam"
  },
  {
    id: 2,
    first_name: "Sophia",
    last_name: "Martinez",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sophia"
  },
  {
    id: 3,
    first_name: "Noah",
    last_name: "Lee",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Noah"
  }
]);

  const [showModal, setShowModal] = useState(false);

  const handleEdit = (avatar) => {
    alert(`Edit avatar: ${avatar.first_name} ${avatar.last_name}`);
  };

  const handleCreate = (newAvatar) => {
    setAvatars([...avatars, { ...newAvatar, id: avatars.length + 1 }]);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Welcome to the AI Dashboard</h1>
        <p>Hello, Akshat! Here's your avatar list.</p>
      </header>

      <section className="card-container">
        {avatars.map(avatar => (
          <AvatarCard key={avatar.id} avatar={avatar} onEdit={handleEdit} />
        ))}
      </section>

      <button className="floating-btn" onClick={() => setShowModal(true)}>
        + Create New Avatar
      </button>

      <Modal show={showModal} onClose={() => setShowModal(false)} onCreate={handleCreate} />
    </div>
  );
}

export default App;