import { useState } from "react";

const Vote = (props) => {
  return <button onClick={props.handleVote}>vote</button>;
};

const VoteCount = ({ count }) => {
  return <div>has {count} votes</div>;
};

const DaysAnecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <div>{anecdote}</div>
    </div>
  );
};

const MostVoted = ({ anecdote, voteCount }) => {
  return (
    <>
      <h2>Anecdote with most votes</h2>
      <div>{anecdote}</div>
      <VoteCount count={voteCount}></VoteCount>
    </>
  );
};

const App = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mostVotedIndex, setMostVotedIndex] = useState(0);

  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [pointsArray, setPointsArray] = useState(
    new Array(anecdotes.length).fill(0)
  );

  const handleSetRandom = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelectedIndex(random);
  };

  const handleVote = () => {
    const copyArray = [...pointsArray];
    copyArray[selectedIndex] = copyArray[selectedIndex] + 1;
    setPointsArray(copyArray);

    const maxPoints = Math.max(...copyArray);
    const newMostVotedIndex = copyArray.indexOf(maxPoints);
    setMostVotedIndex(newMostVotedIndex);
  };

  return (
    <div>
      <DaysAnecdote anecdote={anecdotes[selectedIndex]}></DaysAnecdote>
      <VoteCount count={pointsArray[selectedIndex]}></VoteCount>
      <Vote handleVote={handleVote}></Vote>
      <button onClick={handleSetRandom}>New anecdote</button>
      <MostVoted
        anecdote={anecdotes[mostVotedIndex]}
        voteCount={pointsArray[mostVotedIndex]}
      ></MostVoted>
    </div>
  );
};

export default App;
