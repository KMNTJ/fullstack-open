const Header = ({ size, header }) => {
  if (size === 'h1') return <h1>{header}</h1>;
  if (size === 'h2') return <h2>{header}</h2>;
  return 'check header size';
};

const Part = ({ part }) => {
  return (
    <li>
      {part.name} {part.exercises}
    </li>
  );
};

const Content = ({ course }) => {
  return course.parts.map((part) => <Part key={part.id} part={part}></Part>);
};

const Course = ({ course }) => {
  return (
    <div>
      <Header size={'h2'} header={course.name}></Header>
      <Content course={course}></Content>
    </div>
  );
};

const Total = ({ course }) => {
  const exercises = course.parts.reduce((total, part) => {
    total += part.exercises;
    return total;
  }, 0);
  return <b>total of {exercises} excercises</b>;
};

const Courses = ({ courses }) => {
  return courses.map((x) => {
    return (
      <div key={x.id}>
        <Course course={x}></Course>
        <Total course={x}></Total>
      </div>
    );
  });
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      <Header size={"h1"} header={"Web development curriculum"}></Header>
      <Courses courses={courses}></Courses>
    </div>
  );
};

export default App;
