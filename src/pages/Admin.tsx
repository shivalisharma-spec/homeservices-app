import { useEffect, useState } from "react";
import { API } from "@/api/api";

const Admin = () => {
  const [bookings, setBookings] = useState<any[]>([]);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (user?.role === "admin") {
      fetchBookings();
    }
  }, []);

  const fetchBookings = async () => {
    const res = await API.get(
      `/admin/bookings?email=${user.email}`
    );
    setBookings(res.data);
  };

  const updateStatus = async (id: string, status: string) => {
    await API.put(`/admin/bookings/${id}`, {
      email: user.email,
      status,
    });

    fetchBookings();
  };

  if (user?.role !== "admin") {
    return <h2 className="p-6">Access Denied</h2>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>

      {bookings.map((b) => (
        <div key={b._id} className="border p-3 mb-2 rounded">
          <h3>{b.service}</h3>
          <p>{b.name}</p>
          <p>Status: {b.status}</p>

          <select
            value={b.status}
            onChange={(e) => updateStatus(b._id, e.target.value)}
          >
            <option value="pending">pending</option>
            <option value="confirmed">confirmed</option>
            <option value="completed">completed</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default Admin;