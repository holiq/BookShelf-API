import { homeHandler } from "./handler.js";
const routes = [
  {
    method: "GET",
    path: "/",
    handler: homeHandler,
  },
];

export default routes;
