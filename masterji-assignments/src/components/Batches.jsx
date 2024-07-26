import React, { useState, useEffect, useCallback } from 'react';
import left from '../assets/left.png';
import right from '../assets/right.png';

const initialBatches = [
  { id: 1, name: 'SQL Basics To Advanced Mastery Course', status: 'Published', startDate: '2023-01-01', endDate: '2023-06-30', price: '$100', validity: '1 year', image: 'https://imgproxy.learnyst.com/learnyst-user-assets/school-assets/schools/171024/courses/199462/1721047005916SQL_Course_lyst1721047005951.png' },
  { id: 2, name: '30 Days Of Javascript Challenge', status: 'Unpublished', startDate: '2023-01-01', endDate: '2023-06-30', price: '$100', validity: '1 year', image: 'https://imgproxy.learnyst.com/learnyst-user-assets/school-assets/schools/171024/courses/198942/1720613137821jscha_lyst1720613137832.png' },
  { id: 3, name: 'Interview Preparation With Javascript 2.0', status: 'Published', startDate: '2023-01-01', endDate: '2023-06-30', price: '$100', validity: '1 year', image: 'https://imgproxy.learnyst.com/learnyst-user-assets/school-assets/schools/171024/courses/198829/1720794802493batch2_lyst1720794802508.png' },
];

function Batches() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [filteredBatches, setFilteredBatches] = useState(initialBatches);

  useEffect(() => {
    setFilteredBatches(
      initialBatches.filter((batch) =>
        batch.name.toLowerCase().includes(search.toLowerCase())
      )
    );
    setPage(0);
  }, [search]);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const paginatedBatches = filteredBatches.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  const totalPages = Math.ceil(filteredBatches.length / itemsPerPage);

  const handlePageChange = (event) => {
    const newPage = Number(event.target.value) - 1;
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const handleKeyPress = useCallback((event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
      document.getElementById('search-input').focus();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="min-h-screen w-full bg-violet-300 flex flex-col items-center justify-center p-4">
      <div className="mb-4 font-bold text-8xl text-violet-900">Chai aur Code</div>

      {/* Batches Section */}
      <div className="w-full  mb-8">
        <div className="bg-white rounded-lg shadow-lg p-5 mb-4">
          <div className="text-5xl font-semibold mb-2">Batches</div>

          {/* Placeholder for content */}
          <div className="text-gray-900 text-xl">Create Learner's Batch and share information at the same time.</div>

          {/* Search Box */}
          <div className="flex mb-4 w-full max-w-md mt-8">
            <input
              id="search-input"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Title (ctrl+k or cmd+k)"
              className="p-2 border rounded-l w-full"
            />
            <button
              onClick={() => setFilteredBatches(
                initialBatches.filter((batch) =>
                  batch.name.toLowerCase().includes(search.toLowerCase())
                )
              )}
              className="p-2 bg-violet-700 text-white rounded-md ml-2 px-4 border border-l-0 cursor-pointer"
            >
              Search
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border border-black rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-black text-base uppercase tracking-wider border-r">Title</th>
                  <th className="px-6 py-3 text-left font-medium text-black text-base uppercase tracking-wider border-r">Start Date</th>
                  <th className="px-6 py-3 text-left font-medium text-black text-base uppercase tracking-wider border-r">End Date</th>
                  <th className="px-6 py-3 text-left font-medium text-black text-base uppercase tracking-wider border-r">Price</th>
                  <th className="px-6 py-3 text-left font-medium text-black text-base uppercase tracking-wider">Validity/Expiry</th>
                  <th className="px-6 py-3 text-left font-medium text-black text-base uppercase tracking-wider border-r">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {paginatedBatches.length > 0 ? (
                  paginatedBatches.map((batch) => (
                    <tr key={batch.id} className={`border-b border-black`}>
                      <td className="px-6 py-4 whitespace-nowrap font-bold border-r flex"><img src={batch.image} alt={batch.name} className="h-20 w-24 object-cover rounded-md mr-4" />{batch.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap border-r">{batch.startDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap border-r">{batch.endDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap border-r">{batch.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{batch.validity}</td>
                      <td className="px-6 py-4 whitespace-nowrap border-r">
                        <div className={`rounded-md px-3 w-min py-1 border ${batch.status === 'Unpublished' ? 'bg-gray-500 text-white border-gray-700' : 'bg-green-200 border-green-500'}`}>
                          {batch.status}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap" colSpan="7">
                      No batches found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-end items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span>Rows per page</span>
              <input
                type="number"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                min="1"
                className="p-2 border rounded w-16 text-center"
              />
            </div>
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              disabled={page === 0}
              className={`p-2 border rounded ${page === 0 ? 'bg-gray-100' : 'bg-gray-200'}`}
            >
              <img src={left} className="w-6 bg-blue-200 p-1 rounded" alt="Previous Page" />
            </button>
            <button
              onClick={() =>
                setPage((prev) =>
                  (prev + 1) * itemsPerPage < filteredBatches.length ? prev + 1 : prev
                )
              }
              disabled={(page + 1) * itemsPerPage >= filteredBatches.length}
              className={`p-2 border rounded ${((page + 1) * itemsPerPage >= filteredBatches.length) ? 'bg-gray-100' : 'bg-gray-200'}`}
            >
              <img src={right} className="w-6 bg-blue-200 p-1 rounded" alt="Next Page" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Batches;