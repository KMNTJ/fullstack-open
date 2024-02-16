import { useState } from "react";

const Numbers = ({ persons }) => {
  return (
    <div>
      {persons.map((x) => (
        <div key={x.name}>{x.name}</div>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find((x) => x.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return;
    }
    const newPerson = { name: newName };
    setPersons(persons.concat(newPerson));
    setNewName('');
  };

  const nameChange = (event) => {
    setNewName(event.target.value);
  };
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={nameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons}></Numbers>
    </div>
  );
};

export default App;
