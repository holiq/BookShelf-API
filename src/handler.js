import { nanoid } from "nanoid";
import books from "./books.js";

export const homeHandler = (request, h) => {
  return h.response({
    name: "BookShelf API",
  });
};

export const listBooksHandler = (request, h) => {
  return h.response({
    status: "success",
    data: {
      books: books,
    },
  });
};

export const storeBookHandler = (request, h) => {
  const id = nanoid(16);
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const isFinished = pageCount === readPage ? true : false;
  if (!name) {
    return h.response({
      status: "fail",
      message: "Gagagl menambahkan buku. Mohon isi nama buku",
    }).code(400);
  }

  if (readPage > pageCount) {
    return h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount ",
    }).code(400);
  }

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    isFinished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  return h.response({
    status: "success",
    message: "Buku berhasil ditambahkan",
    data: {
      bookId: id,
    },
  }).code(201);
};
