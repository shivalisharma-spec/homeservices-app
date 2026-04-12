import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "@/api/api";

const BookService = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState<any>(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    date: "",
    time: "",
    description: "",
  });

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const loadService = async () => {
      try {
        const res = await API.get(`/api/services/${id}`);
        setService(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    loadService();
  }, [id]);

  const handleBooking = async () => {
    const raw = localStorage.getItem("user");

    let user = null;
    try {
      user = raw ? JSON.parse(raw) : null;
    } catch {
      user = null;
    }

    if (!user) {
      alert("Please login");
      return;
    }

    const payload = {
      userId: user._id,
      service: service.name,
      ...form,
      status: "pending",
    };

    await fetch("http://localhost:4000/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    alert("Booking Confirmed 🎉");
    navigate("/my-bookings");
  };

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading service...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">

      <div className="max-w-3xl mx-auto">

        {/* SERVICE CARD */}
        <div className="bg-white rounded-2xl shadow-md p-6 border mb-6">

          <h1 className="text-2xl font-bold text-gray-800">
            {service.name}
          </h1>

          <p className="text-gray-500 mt-2">
            {service.description}
          </p>

          <p className="text-green-600 font-bold mt-3 text-lg">
            ₹{service.price}
          </p>

        </div>

        {/* FORM CARD */}
        <div className="bg-white rounded-2xl shadow-md p-6 border">

          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Enter Booking Details
          </h2>

          <div className="grid gap-4">

            <input
              className="p-3 border rounded-lg"
              placeholder="Full Name"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              className="p-3 border rounded-lg"
              placeholder="Phone Number"
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />

            <input
              className="p-3 border rounded-lg"
              placeholder="Address"
              onChange={(e) =>
                setForm({ ...form, address: e.target.value })
              }
            />

            <div className="grid grid-cols-2 gap-3">

              <input
                type="date"
                min={today}
                className="p-3 border rounded-lg"
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value })
                }
              />

              <input
                type="time"
                className="p-3 border rounded-lg"
                onChange={(e) =>
                  setForm({ ...form, time: e.target.value })
                }
              />

            </div>

            <textarea
              className="p-3 border rounded-lg"
              placeholder="Additional notes (optional)"
              rows={3}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <button
              onClick={handleBooking}
              className="bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
            >
              Confirm Booking
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default BookService;