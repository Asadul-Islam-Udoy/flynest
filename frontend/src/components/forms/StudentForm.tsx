import React, { useState, useEffect } from "react";
import API from "../../api/api";

interface Props { refresh?: () => void }

const StudentForm: React.FC<Props> = ({ refresh }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number>(0);
  const [classes, setClasses] = useState<any[]>([]);
  const [classId, setClassId] = useState<number | null>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await API.get("/classes/all");
        setClasses(res.data);
        if(res.data.length > 0) setClassId(res.data[0].id);
      } catch (err) { console.error(err); }
    };
    fetchClasses();
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!classId) return;
    try {
      await API.post("/students", { name, age, classId });
      setName(""); setAge(0); setClassId(classes[0]?.id || null);
      refresh && refresh();
    } catch (err: any) { alert(err.response?.data?.error || err.message); }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Student Name" className="border p-1 rounded" required />
      <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} placeholder="Age" className="border p-1 rounded" required />
      <select value={classId || ""} onChange={e => setClassId(Number(e.target.value))} className="border p-1 rounded">
        {classes.map(c => <option key={c.id} value={c.id}>{c.name} - {c.section}</option>)}
      </select>
      <button type="submit" className="bg-green-600 text-white px-2 py-1 rounded">Add Student</button>
    </form>
  );
};

export default StudentForm;
