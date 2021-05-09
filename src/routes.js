const {addBooksHandler, getAllBooksHandler, getDetailBooksByIdHandler, editBooksByIdHandler, deleteBooksByIdHandler} = require('./handler');

const routes = [
    //method untuk mengepost atau add books
    {
        method:'POST',
        path:'/books',
        handler:addBooksHandler
    },
    //method untuk get all data 
    {
        method:'GET',
        path:'/books',
        handler:getAllBooksHandler
        
    },
    //method untuk get detail by id
    {
        method:'GET',
        path:'/books/{id}',
        handler:getDetailBooksByIdHandler
        
    },
    //method untuk edit (put)
    {
        method:'PUT',
        path:'/books/{id}',
        handler:editBooksByIdHandler
        
    },
    //method untuk delete
    {
        method:'DELETE',
        path:'/books/{id}',
        handler:deleteBooksByIdHandler
        
    }
]


module.exports = routes;