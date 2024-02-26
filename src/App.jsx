import { useState, useEffect } from "react";
import axios from "axios";

const Numbers = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <PersonNumber key={person.name} person={person}></PersonNumber>
      ))}
    </div>
  );
};

const PersonNumber = ({ person }) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  );
};

const Filter = ({ handleChange }) => {
  return (
    <div>
      filter shown with<input onChange={handleChange}></input>
    </div>
  );
};

const PersonForm = ({
  handleSubmit,
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [shownPersons, setShownPersons] = useState(persons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [currentFilter, setCurrentFilter] = useState("");

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setShownPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find((x) => x.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const newPerson = { name: newName, number: newNumber };
    const newPersons = persons.concat(newPerson);
    setPersons(newPersons);
    setShownPersons(filterPersons(newPersons, currentFilter));
    setNewName("");
    setNewNumber("");
  };

  const nameChange = (event) => {
    setNewName(event.target.value);
  };

  const numberChange = (event) => {
    setNewNumber(event.target.value);
  };

  function filterPersons(toFilter, filterWith) {
    return toFilter.filter(
      (x) => x.name.toLowerCase().indexOf(filterWith.toLowerCase()) !== -1
    );
  }

  const filterValueChange = (event) => {
    const newCurrentFilter = event.target.value;
    setCurrentFilter(newCurrentFilter);
    setShownPersons(filterPersons(persons, newCurrentFilter));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={filterValueChange}></Filter>
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={nameChange}
        handleNumberChange={numberChange}
      ></PersonForm>
      <h3>Numbers</h3>
      <Numbers persons={shownPersons}></Numbers>
    </div>
  );
};

export default App;
