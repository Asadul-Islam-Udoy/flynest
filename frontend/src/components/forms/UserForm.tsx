import React, { useState } from "react";
import API from "../../api/api";
import toast from "react-hot-toast";

interface Props {
  refresh?: () => void;
}

const UserForm: React.FC<Props> = ({ refresh }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup/", {
        name,
        email,
        role,
        password: "1234567",
      });
      setName("");
      setEmail("");
      setRole("student");
      refresh && refresh();
      toast.success("User created successfully!");
    } catch (err: any) {
      if (err.response?.data?.error) {
        const errors = err.response.data.error;
        errors.forEach((e: any) => {
          if (e.constraints) {
            Object.values(e.constraints).forEach((msg: any) =>
              toast.error(msg)
            );
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="border p-1 rounded"
        required
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-1 rounded"
        required
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border p-1 rounded"
      >
        <option value="admin">Admin</option>
        <option value="teacher">Teacher</option>
        <option value="student">Student</option>
      </select>
      <button
        type="submit"
        className="bg-green-600 text-white px-2 py-1 rounded mt-2"
      >
        Create User
      </button>
    </form>
  );
};

export default UserForm;
