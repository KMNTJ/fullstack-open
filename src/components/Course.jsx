const Header = ({ size, header }) => {
    if (size === "h1") return <h1>{header}</h1>;
    if (size === "h2") return <h2>{header}</h2>;
    return "check header size";
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
      <Header size={"h2"} header={course.name}></Header>
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

export {Header, Course, Total};
