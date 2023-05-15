import { homeHandler, listBooksHandler, storeBookHandler } from "./handler.js";
const routes = [
  {
    method: "GET",
    path: "/",
    handler: homeHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: listBooksHandler,
  },
  {
    method: "POST",
    path: "/books",
    handler: storeBookHandler,
  },
];

export default routes;
