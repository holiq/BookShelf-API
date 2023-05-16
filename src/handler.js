import { nanoid } from "nanoid";
import books from "./books.js";

export const homeHandler = (request, h) => {
  return h.response({
    name: "BookShelf API",
  }).code(200);
};

export const listBooksHandler = (request, h) => {
  const { name, finished, reading } = request.query;
  let dataBooks = books;

  if (name) {
    dataBooks = books.filter((book) =>
      book.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (finished) {
    dataBooks = books.filter((book) => book.finished == finished);
  }

  if (reading) {
    dataBooks = books.filter((book) => Number(book.reading) == Number(reading));
  }

  return h.response({
    status: "success",
    data: {
      books: dataBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  }).code(200);
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
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    }).code(400);
  }

  if (readPage > pageCount) {
    return h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
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
      message: "Buku tidak ditemukan",
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
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    }).code(400);
  }

  if (readPage > pageCount) {
    return h.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    }).code(400);
  }

  if (book == -1) {
    return h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Id tidak ditemukan",
    }).code(404);
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
  }).code(200);
};

export const destroyBookHandler = (request, h) => {
  const { bookId } = request.params;
  const book = books.findIndex((book) => book.id == bookId);

  if (book == -1) {
    return h.response({
      status: "fail",
      message: "Buku gagal dihapus. Id tidak ditemukan",
    }).cod (404);
  }

  books.splice(book, 1);

  return h.response({
    status: "success",
    message: "Buku berhasil dihapus",
  }).code(200);
};
