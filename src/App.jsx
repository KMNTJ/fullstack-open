const Header = (props) => {
  return <p>{props.name}</p>;
};

const Content = (props) => {
  let content = [];
  props.parts.forEach((part) => {
    content.push(<Part part={part}></Part>);
  });
  return <>{content}</>;
};

const Part = (props) => {
  let part = props.part;
  return (
    <div>
      <p>{part.partDescription}</p>
      <p>{part.excercises}</p>
    </div>
  );
};

const Total = (props) => {
  let total = 0;
  props.parts.forEach((part) => {
    total += part.excercises;
  });
  return <p>{`Number of exercises ${total}`}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      partDescription: "Fundamentals of React",
      excercises: 10,
    },
    {
      partDescription: "Using props to pass data",
      excercises: 7,
    },
    {
      partDescription: "State of a component",
      excercises: 14,
    },
  ];

  return (
    <div>
      <Header name={course}></Header>
      <Content parts={parts}></Content>
      <Total parts={parts}></Total>
    </div>
  );
};

export default App;
