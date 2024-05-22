import React, { useState, useEffect } from 'react';
import './Paginate.css'

function Paginate() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <h1 className='my-3'>Product List</h1>
      <div >
        {currentItems.map(item => (
          <div key={item.id} className='product'>
            <div className='product_desc'>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <p><strong>Price:</strong> ${item.price}</p>
            </div>
            <img src={item.image} alt={item.title} className='product_image' />
          </div>
        ))}
      </div>
      <div className="my-3">
        <button
          className="btn btn-primary mr-6"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          First
        </button>
        <button
          className="btn btn-primary mx-2"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button
          className="btn btn-primary mx-2"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <button
          className="btn btn-primary ml-2"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </div>
    </div>
  );
}

export default Paginate;
