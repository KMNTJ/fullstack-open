const Header = (props) => {
  let courseName = props.course.name;
  return <p>{courseName}</p>;
};

const Content = (props) => {
  let content = [];
  props.course.parts.forEach((part) => {
    content.push(<Part part={part}></Part>);
  });
  return <>{content}</>;
};

const Part = (props) => {
  let part = props.part;
  return (
    <div>
      <p>{part.name}</p>
      <p>{part.excercises}</p>
    </div>
  );
};

const Total = (props) => {
  let total = 0;
  props.course.parts.forEach((part) => {
    total += part.excercises;
  });
  return <p>{`Number of exercises ${total}`}</p>;
};

const App = () => {
  const course = {


    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        excercises: 10,
      },
      {
        name: "Using props to pass data",
        excercises: 7,
      },
      {
        name: "State of a component",
        excercises: 14,
      },
    ]
  }

  return (
    <div>
      <Header course={course}></Header>
      <Content course={course}></Content>
      <Total course={course}></Total>
    </div>
  );
};

export default App;
