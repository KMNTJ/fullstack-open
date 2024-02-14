import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value} {text === "positive" ? "%" : null}
      </td>
    </tr>
  );
};

const Statistics = (props) => {
  const { good, neutral, bad, total } = props.stats;
  const avarage = (good - bad) / total;
  const positive = (good / total) * 100;

  return (
    <div>
      <h2>Statistics</h2>
      {total ? (
        <table>
          <tbody>
            <StatisticLine value={good} text="good"></StatisticLine>
            <StatisticLine value={neutral} text="neutral"></StatisticLine>
            <StatisticLine value={bad} text="bad"></StatisticLine>
            <StatisticLine value={total} text="all"></StatisticLine>
            <StatisticLine value={avarage} text="avarage"></StatisticLine>
            <StatisticLine value={positive} text="positive"></StatisticLine>
          </tbody>
        </table>
      ) : (
        <>No feedback given</>
      )}
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
