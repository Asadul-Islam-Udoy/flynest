import React, { useState } from "react";
import API from "../../api/api";
import toast from "react-hot-toast";

interface Props { refresh?: () => void }

const ClassForm: React.FC<Props> = ({ refresh }) => {
  const [name, setName] = useState("");
  const [section, setSection] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const response =  await API.post("/classes", { name, section });
    setName(""); 
    setSection("");
    refresh && refresh();
    toast.success("Class created successfully!");
    console.log('edd',response)
  } catch (err: any) {
    const dataError = err.response?.data?.error;
  
    if (dataError) {
      // normalize to array
      const errors = Array.isArray(dataError) ? dataError : [dataError];

      errors.forEach((e: any) => {
        if (e.constraints) {
          Object.values(e.constraints).forEach((msg: any) => toast.error(msg));
        }
      });

    } else if (err.response) {
      toast.error(`Error ${err.response.status}: ${err.response.statusText}`);
    } else {
      toast.error(err.message);
    }
  }
};

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
      <input 
        value={name} 
        onChange={e => setName(e.target.value)} 
        placeholder="Class Name" 
        className="border p-1 rounded" 
        required 
      />
      <input 
        value={section} 
        onChange={e => setSection(e.target.value)} 
        placeholder="Section" 
        className="border p-1 rounded" 
        required 
      />
      <button 
        type="submit" 
        className="bg-green-600 text-white px-2 py-1 rounded"
      >
        Create Class
      </button>
    </form>
  );
};

export default ClassForm;
