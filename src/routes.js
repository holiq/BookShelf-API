import {
  findBookHandler,
  homeHandler,
  listBooksHandler,
  storeBookHandler,
  updateBookHandler,
} from "./handler.js";
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
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: findBookHandler,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: updateBookHandler,
  },
];

export default routes;
