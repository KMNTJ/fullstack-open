const Hello = (props) => {
  return <p>Hello {props.foo}</p>;
};

const App = () => {
  const bar = "qwe";
  const flo = ['dfg', 'hrty'];

  return (
    <div>
      <Hello foo="asd" />
      <Hello foo={bar} />
      <p>{flo}</p>
    </div>
  );
};

export default App;
