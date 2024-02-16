import { useState } from "react";

const Numbers = ({ persons }) => {
  return (
    <div>
      {persons.map((x) => (
        <div key={x.name}>{x.name} {x.number}</div>
      ))}
    </div>
  );
};

const Filter = ({handleChange}) => {
  return (
    <div>filter shown with<input onChange={handleChange}></input></div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [shownPersons, setShownPersons] = useState(persons);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');


  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find((x) => x.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return;
    }
    const newPerson = { name: newName, number: newNumber };
    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
  };

  const nameChange = (event) => {
    setNewName(event.target.value);
  };

  const numberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const filterValueChange = (event) => {
    const currentFilter = event.target.value;
    const filteredPersons = persons.filter((x) => x.name.toLowerCase().indexOf(currentFilter.toLowerCase()) !== -1)
    setShownPersons(filteredPersons);
  };
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={filterValueChange}></Filter>
      <h3>Add a new</h3>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={nameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={numberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      <Numbers persons={shownPersons}></Numbers>
    </div>
  );
};

export default App;
