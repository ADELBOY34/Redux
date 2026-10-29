import React from "react";

// Describe the props that Greeting receives from its parent component.
interface GreetingProps {
  name: string;
}

// Type the component's props so TypeScript checks how it is used.
const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return <div>Hello, {name}!</div>;
};

export default Greeting;
