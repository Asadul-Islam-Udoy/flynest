import React, { useEffect, useState } from "react";
import API from "../api/api";
import ClassForm from "../components/forms/ClassForm";

const Classes: React.FC = () => {
  const [classes, setClasses] = useState<any[]>([]);

  const fetchClasses = async () => {
    try {
      const res = await API.get("/classes/all/"); // make sure your backend route is /classes/all
      setClasses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);
 console.log('classes',classes)
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Classes</h2>

      {/* Add Class Form */}
      <div className="mb-6">
        <ClassForm refresh={fetchClasses} />
      </div>

      {/* Classes Table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Section</th>
              <th className="px-4 py-2 text-left">Students Count</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <tr
                key={cls.id}
                className="border-b hover:bg-gray-100 transition-colors"
              >
                <td className="px-4 py-2">{cls.id}</td>
                <td className="px-4 py-2">{cls.name}</td>
                <td className="px-4 py-2">{cls.section}</td>
                <td className="px-4 py-2">{cls.students?.length || 0}</td>
              </tr>
            ))}
            {classes.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No classes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Classes;
