const Header = (props) => {
  let courseName = props.course.name;
  return <h1>{courseName}</h1>;
};

// const Content = (props) => {
//   let content = [];
//   props.course.parts.forEach((part) => {
//     content.push(<Part part={part}></Part>);
//   });
//   return <>{content}</>;
// };

// const Part = (props) => {
//   let part = props.part;
//   return (
//     <div>
//       <p>{part.name}</p>
//       <p>{part.excercises}</p>
//     </div>
//   );
// };

// const Total = (props) => {
//   let total = 0;
//   props.course.parts.forEach((part) => {
//     total += part.excercises;
//   });
//   return <p>{`Number of exercises ${total}`}</p>;
// };

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
    ],
  };

  return (
    <div>
      <Course course={course}></Course>
    </div>
  );
};

// <Header course={course}></Header>
// <Content course={course}></Content>
// <Total course={course}></Total>

export default App;
