import React, { useEffect, useState } from "react";
import API from "../api/api";
import StudentForm from "../components/forms/StudentForm";

const Students: React.FC = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [idFilter, setIdFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const fetchStudents = async () => {
    try {
      const res = await API.get("/students", {
        params: { page, limit: 1000 }, // fetch bigger chunk for frontend filtering
      });
      setStudents(res.data.data);
      setFiltered(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Real-time filtering
  useEffect(() => {
    let result = [...students];

    if (idFilter) result = result.filter((s) => String(s.id) === idFilter);
    if (nameFilter)
      result = result.filter((s) =>
        s.name.toLowerCase().includes(nameFilter.toLowerCase())
      );

    setFiltered(result);
    setPage(1);
  }, [idFilter, nameFilter, students]);

  // Paginate filtered results
  const paginated = filtered.slice((page - 1) * limit, page * limit);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Students</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="number"
          placeholder="Search by ID"
          value={idFilter}
          onChange={(e) => setIdFilter(e.target.value)}
          className="border border-gray-300 p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 flex-1 min-w-[150px]"
        />
        <input
          type="text"
          placeholder="Search by Name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="border border-gray-300 p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 flex-1 min-w-[200px]"
        />
      </div>

      {/* Student Form */}
      <div className="mb-6">
        <StudentForm refresh={fetchStudents} />
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Age</th>
              <th className="px-4 py-2 text-left">Class</th>
              <th className="px-4 py-2 text-left">Section</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((s) => (
              <tr
                key={s.id}
                className="border-b hover:bg-gray-100 transition-colors"
              >
                <td className="px-4 py-2">{s.id}</td>
                <td className="px-4 py-2">{s.name}</td>
                <td className="px-4 py-2">{s.age}</td>
                <td className="px-4 py-2">{s.class}</td>
                <td className="px-4 py-2">{s.section}</td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-4 text-gray-500"
                >
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50 hover:bg-gray-300 transition"
        >
          Prev
        </button>
        <span className="text-gray-700">
          Page {page} of {Math.ceil(filtered.length / limit)}
        </span>
        <button
          disabled={page * limit >= filtered.length}
          onClick={() => setPage((p) => p + 1)}
          className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50 hover:bg-gray-300 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Students;
