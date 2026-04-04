import { Welcome } from "../welcome/welcome";
import { Route } from "./+types/home";

/**
 * Generates metadata for the home page route.
 * @returns {Array} An array of meta objects containing page title and description
 */
export const meta: Route.MetaFunction = () => {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

/**
 * Home page component.
 * @returns {React.ReactElement} The Welcome component
 */
const Home: React.FC = () => {
  return <Welcome />;
}

export default Home;


