const { nanoid } =require("nanoid");
const books = require('./books');

const addBooksHandler = (request, h) => {
    //declare variable
    const {
      name, year, author, summary, publisher, pageCount, readPage, reading,
    } = request.payload;
    const id = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
  
    //kondisi tidak ada nama buku
    if (!name ||name===undefined) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      });
      response.code(400);
      return response;
    }
    //readpage lebih besar dibandung dengan pagecount
    if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);
      return response;
    }
    //untuk push kedalam book object
    const newBook = {
      id, name, year,author, summary, publisher, pageCount, readPage, reading, finished, reading, insertedAt, updatedAt,
    };
    books.push(newBook);
    const isSuccess = books.filter((book) => book.id === id).length > 0;
    if (isSuccess) {
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        },
      });
      response.code(201);
      return response;
    }
    const response = h.response({
      status: 'error',
      message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
  };

  //view all books
const getAllBooksHandler = (request, h) => {
    const { name, reading, finished } = request.query;
    if (name) {
      return {
        status: 'success',
        data: {
        books: books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase())).map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                })),
            },
        };
    }
    //reading condition
    if (reading) {
    const isReading = reading === '1';
    return {
        status: 'success',
        data: {
            books: books.filter((book) => book.reading === isReading).map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
                })),
            },
        };
    }
    //finished condition
    if (finished) {
    const isFinished = finished === '1';
    return {
        status: 'success',
        data: {
            books: books.filter((book) => book.finished === isFinished).map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
                })),
            },
        };
    }
    return {
    status: 'success',
    data: {
        books: books.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
        })),
        },
    };
};

//handler detail data by id
const getDetailBooksByIdHandler = (request,h)=>{
    const {id} = request.params;
    const book = books.filter((x)=>x.id===id)[0];
    //success
    if(book!==undefined){
        return {
            status: 'success',
            data:{
                book
            }
        }
    }
    //error fail
    const response = h.response({
        status:'fail',
        message:'Buku tidak ditemukan'
    });
    response.code(404);
    return response;
};

//edit data books by id
const editBooksByIdHandler =(request, h)=>{
    const {id} = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const updatedAt = new Date().toISOString();
    const index = books.findIndex((book)=>book.id===id);

    //nama buku tidak ada error
      if (!name || name === undefined) {
        const response = h.response({
          status: "fail",
          message: "Gagal memperbarui buku. Mohon isi nama buku",
        });
        response.code(400);
        return response;
      } 
      //error readpage lebih besar dibanding pagecount
      else if (readPage > pageCount) {
        const response = h.response({
          status: "fail",
          message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        });
        response.code(400);
        return response;
      } 
      // success
      else if (index!==-1) {
        books[index]={
            ...books[index], name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt
        }
        const response = h.response({
            status : 'success',
            message: 'Buku berhasil diperbarui'
        });
        response.code(200);
        return response
      }
      //other error
      const response = h.response({
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan",
      });
      response.code(404);
      return response;
};

//delete books by id
const deleteBooksByIdHandler = (request, h)=>{
    const {id} = request.params;
    const index = books.findIndex((book)=>book.id===id);
//success
    if(index !== -1){
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }
//error
    const response = h.response({
        status:'fail',
        message:'Buku gagal dihapus. Id tidak ditemukan'
    });
    response.code(404);
    return response;
};

module.exports ={addBooksHandler, getAllBooksHandler, getDetailBooksByIdHandler,editBooksByIdHandler, deleteBooksByIdHandler};