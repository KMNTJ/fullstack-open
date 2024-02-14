import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Tally = ({ text, count }) => {
  return (
    <div>
      {text} {count}
    </div>
  );
};

const Avarage = ({ total, good, bad }) => {
  return <div>avarage {(good - bad) / total}</div>;
};

const Positive = ({ total, good }) => {
  return <div>positive {(good / total) * 100} %</div>;
};

const Statistics = (props) => {
  const { good, neutral, bad, total } = props.stats;
  return (
    <div>
      <h2>Statistics</h2>
      <Tally text="good" count={good}></Tally>
      <Tally text="neutral" count={neutral}></Tally>
      <Tally text="bad" count={bad}></Tally>
      <Tally text="all" count={total}></Tally>
      <Avarage total={total} good={good} bad={bad}></Avarage>
      <Positive total={total} good={good}></Positive>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
    setTotal(total + 1);
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setTotal(total + 1);
  };
  const handleBad = () => {
    setBad(bad + 1);
    setTotal(total + 1);
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGood} text="good"></Button>
      <Button handleClick={handleNeutral} text="neutral"></Button>
      <Button handleClick={handleBad} text="bad"></Button>
      <Statistics stats={{ good, neutral, bad, total }}></Statistics>
    </div>
  );
};

export default App;
