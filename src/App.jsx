const Header = (props) => {
  let courseName = props.course.name;
  return <h1>{courseName}</h1>;
};

const Part = ({ part }) => {
  return (
    <li>
      {part.name} {part.excercises}
    </li>
  );
};

const Content = ({ course }) => {
  return course.parts.map((part) => <Part key={part.id} part={part}></Part>);
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course}></Header>
      <Content course={course}></Content>
    </div>
  );
};

const Total = ({ course }) => {
  let total = 0;
  course.parts.forEach((x) => {
    total = total + x.excercises;
  });
  return <b>total of {total} excercises</b>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        id: 1,
        name: "Fundamentals of React",
        excercises: 10,
      },
      {
        id: 2,
        name: "Using props to pass data",
        excercises: 7,
      },
      {
        id: 3,
        name: "State of a component",
        excercises: 14,
      },
      {
        id: 4,
        name: "Redux",
        excercises: 11,
      },
    ],
  };

  return (
    <div>
      <Course course={course}></Course>
      <Total course={course}></Total>
    </div>
  );
};

export default App;
