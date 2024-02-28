import { useState, useEffect } from "react";
import myApi from "./api";

const DeleteRecord = ({ deletionHandler, id }) => {
  return (
    <div style={{ margin: "6px" }}>
      <button onClick={deletionHandler(id)}>delete</button>;
    </div>
  );
};

const Numbers = ({ persons, deletionHandler }) => {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.name} style={{ display: "flex" }}>
          <PersonNumber person={person}></PersonNumber>
          <DeleteRecord
            id={person.id}
            deletionHandler={deletionHandler}
          ></DeleteRecord>
        </div>
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
    myApi.getAll().then((persons) => {
      setPersons(persons);
      setShownPersons(persons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((x) => x.name === newName);
    if (existingPerson) {
      const decision = confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (decision) {
        const updatedInformation = { ...existingPerson, number: newNumber };
        myApi
          .update(existingPerson.id, updatedInformation)
          .then((updatedPerson) => {
            const newPersons = persons.map((personOnList) =>
              updatedPerson.number === personOnList.number
                ? personOnList
                : { ...personOnList, number: newNumber }
            );
            setPersons(newPersons);
            setShownPersons(filterPersons(newPersons, currentFilter));
            setNewName("");
            setNewNumber("");
          });
      }
    }
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

  const deletionHandler = (id) => () => {
    myApi.deleteById(id).then((person) => {
      const newPersons = persons.filter((per) => per.id !== person.id);
      setPersons(newPersons);
      setShownPersons(filterPersons(newPersons, currentFilter));
    });
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
      <Numbers
        persons={shownPersons}
        deletionHandler={deletionHandler}
      ></Numbers>
    </div>
  );
};

export default App;
