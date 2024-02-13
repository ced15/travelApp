import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const MementoForm = ({ setShowForm, setAllMementos }) => {
    const navigate = useNavigate();
    
  const token = localStorage.getItem("token");
  const [memento, setMemento] = useState({
    alarmDate: "",
    mementoMessage: "",
  });

  function handleInputChange(e) {
    setMemento({
      ...memento,
      [e.target.name]: e.target.value,
    });
  }

  function submitForm(e) {
    e.preventDefault();
    if (memento.mementoMessage != "") {
      fetch("http://localhost:8080/memento/createMemento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(memento),
      })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setAllMementos((prevMementos)=>[...prevMementos, data]);
            setShowForm(false)
        })
        .catch((error) => {
          console.error(`Failed to create memento! ${error.message}`);
        });
    }
  }

  return (
    <div className="bg-[url('/images/memento_bk.jpg')] bg-cover bg-no-repeat bg-fixed">
      <div className="min-h-screen flex items-center justify-center">
        <div className="backdrop-blur-2xl bg-white/30 p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-xl font-semibold mb-4">Create your memento</h1>
          <form onSubmit={submitForm}>
            <div className="mb-4">
              <textarea
                name="mementoMessage"
                placeholder="Add your memento"
                className="input w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500"
                onChange={handleInputChange}
                value={memento.mementoMessage}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default MementoForm;
