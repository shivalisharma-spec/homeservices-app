import { useEffect, useState } from "react";
import { API } from "@/api/api";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await API.get("/api/services");
        console.log("SERVICES:", res.data);
        setServices(res.data);
      } catch (err) {
        console.log("Services error:", err);
      }
    };

    loadServices();
  }, []);

  const grouped = services.reduce((acc: any, s: any) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-10 text-gray-800">
          Available Services
        </h1>

        {Object.keys(grouped).map((cat) => (
          <div key={cat} className="mb-12">

            {/* CATEGORY TITLE */}
            <h2 className="text-xl font-semibold mb-6 capitalize text-gray-700 border-b pb-2">
              {cat.replace("_", " ")}
            </h2>

            {/* GRID */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

              {grouped[cat].map((s: any) => (
                <div
                  key={s._id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 border"
                >

                  {/* SERVICE NAME */}
                  <h3 className="text-lg font-semibold text-gray-800">
                    {s.name}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="text-sm text-gray-500 mt-1">
                    {s.description}
                  </p>

                  {/* FOOTER */}
                  <div className="flex items-center justify-between mt-5">

                    <span className="text-green-600 font-bold text-lg">
                      ₹{s.price}
                    </span>

                    <button
                      onClick={() => navigate(`/book/${s._id}`)}
                      className="px-4 py-2 text-sm rounded-lg bg-black text-white hover:bg-gray-800 transition"
                    >
                      Book Now
                    </button>

                  </div>

                </div>
              ))}

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Services;