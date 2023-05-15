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
  const finished = pageCount === readPage ? true : false;
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
    finished,
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

export const findBookHandler = (request, h) => {
  const { bookId } = request.params;

  const book = books.find((book) => book.id == bookId);

  if (!book) {
    return h.response({
      status: "fail",
      message: "Buku tak ditemukan",
    }).code(404);
  }

  return h.response({
    status: "success",
    data: {
      book,
    },
  }).code(200);
};

export const updateBookHandler = (request, h) => {
  const { bookId } = request.params;
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
  const updatedAt = new Date().toISOString();
  const book = books.findIndex((book) => book.id == bookId);
  const finished = pageCount === readPage ? true : false;

  if (!name) {
    return h.response({
      status: "fail",
      message: "Gagagl memperbarui buku. Mohon isi nama buku",
    }).code(400);
  }

  if (readPage > pageCount) {
    return h.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount ",
    }).code(400);
  }

  if (book == -1) {
    return h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Id tidak ditemukan",
    });
  }

  books[book] = {
    ...books[book],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    updatedAt,
  };

  return h.response({
    status: "success",
    message: "Buku berhasil diperbarui",
  });
};
