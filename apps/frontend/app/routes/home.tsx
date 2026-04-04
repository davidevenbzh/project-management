import { ComponentShowcase } from "../components/ComponentShowcase/ComponentShowcase";
import { Route } from "./+types/home";

/**
 * Generates metadata for the home page route.
 * @returns {Array} An array of meta objects containing page title and description
 */
export const meta: Route.MetaFunction = () => {
  return [
    { title: "Project Management Component Library" },
    {
      name: "description",
      content: "MUI-backed hacker-theme component library preview.",
    },
  ];
};

/**
 * Home page component.
 * @returns {React.ReactElement} The Welcome component
 */
const Home = () => {
  return <ComponentShowcase />;
};

export default Home;
