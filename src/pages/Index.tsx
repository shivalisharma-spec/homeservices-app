import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Shield,
  Clock,
  Star,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Shield,
    title: "Verified Pros",
    desc: "Background-checked professionals you can trust.",
  },
  {
    icon: Clock,
    title: "On-Time Service",
    desc: "Guaranteed timely arrival for all bookings.",
  },
  {
    icon: Star,
    title: "Top Rated",
    desc: "Highly rated services with quality assurance.",
  },
];

const categories = [
  { icon: "🔧", label: "Plumbing", value: "plumbing" },
  { icon: "⚡", label: "Electrical", value: "electrical" },
  { icon: "🧹", label: "Cleaning", value: "cleaning" },
  { icon: "🪚", label: "Carpentry", value: "carpentry" },
  { icon: "🐜", label: "Pest Control", value: "pest_control" },
];

const Index = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user && user !== "undefined");
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">

      {/* HERO */}
      <section className="relative overflow-hidden py-28 text-center text-white bg-gradient-to-r from-gray-900 to-gray-700">

        <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400 opacity-20 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-52 h-52 bg-blue-400 opacity-20 blur-3xl rounded-full animate-pulse"></div>

        <h1 className="text-5xl font-bold relative z-10">
          Home Services{" "}
          <span className="text-yellow-400">Made Simple</span>
        </h1>

        <p className="mt-4 text-gray-200 text-lg relative z-10">
          Book trusted professionals in seconds
        </p>

        {/* FLOATING BUTTONS */}
        <div className="relative z-10 mt-10 flex flex-col sm:flex-row justify-center gap-5">

          <motion.div whileHover={{ y: -5, scale: 1.05 }}>
            <Button
              onClick={() => navigate("/services")}
              className="px-7 py-6 text-base rounded-full bg-white text-black shadow-xl hover:shadow-2xl transition"
            >
              Browse Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div whileHover={{ y: -5, scale: 1.05 }}>
            <Button
              onClick={() => {
                if (isLoggedIn) {
                  navigate("/services");
                } else {
                  navigate("/signup");
                }
              }}
              className="px-7 py-6 text-base rounded-full bg-black text-white border border-white/20 shadow-xl hover:shadow-2xl transition"
            >
              Get Started
              <Sparkles className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-3xl font-bold">Popular Categories</h2>
          <p className="text-gray-500 mt-2">
            Choose a service category
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mt-10">

            {categories.map((cat) => (
              <motion.div
                key={cat.value}
                whileHover={{ scale: 1.08, y: -5 }}
                onClick={() =>
                  navigate(`/services?category=${cat.value}`)
                }
                className="cursor-pointer bg-white border rounded-2xl p-6 shadow-md hover:shadow-xl transition"
              >
                <div className="text-4xl">{cat.icon}</div>
                <p className="mt-2 font-semibold">{cat.label}</p>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 text-center">

          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition"
            >
              <f.icon className="mx-auto mb-3 text-gray-700" />
              <h3 className="font-bold">{f.title}</h3>
              <p className="text-gray-500 text-sm mt-2">{f.desc}</p>
            </div>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold">
          Ready to book a service?
        </h2>

        <Link to="/signup">
          <Button className="mt-6 px-7 py-6 rounded-full shadow-lg">
            Create Account
            <Sparkles className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </section>

    </div>
  );
};

export default Index;