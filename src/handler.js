import { nanoid } from "nanoid";
import books from "./books.js";

export const homeHandler = (request, h) => {
  return h.response({
    name: "BookShelf API",
  });
};
