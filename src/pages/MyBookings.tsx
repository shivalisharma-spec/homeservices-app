import { useEffect, useState } from "react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    fetch(`http://localhost:4000/api/bookings/${user._id}`)
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "confirmed":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <div className="text-center mt-20 text-gray-500">
          <p className="text-lg">No bookings yet 😔</p>
          <p className="text-sm mt-1">Book a service to see it here</p>
        </div>
      ) : (
        <div className="grid gap-5">

          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 border"
            >

              {/* HEADER */}
              <div className="flex justify-between items-start">

                <h2 className="text-xl font-semibold text-gray-800">
                  {b.service}
                </h2>

                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusColor(
                    b.status
                  )}`}
                >
                  {b.status}
                </span>

              </div>

              {/* DATE & TIME */}
              <p className="text-sm text-gray-600 mt-2">
                📅 {b.date} &nbsp; | &nbsp; ⏰ {b.time}
              </p>

              {/* DETAILS BOX */}
              <div className="mt-4 grid md:grid-cols-2 gap-3 text-sm">

                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500">📍 Address</p>
                  <p className="font-medium text-gray-700">{b.address}</p>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500">📞 Phone</p>
                  <p className="font-medium text-gray-700">{b.phone}</p>
                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default MyBookings;