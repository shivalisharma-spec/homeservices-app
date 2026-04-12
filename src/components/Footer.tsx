import { Home, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t bg-muted/30 mt-auto">
    <div className="container mx-auto px-4 py-12 grid gap-8 md:grid-cols-3">

      {/* BRAND */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Home className="h-5 w-5 text-primary" />
          <span className="text-lg font-bold">HomeServ</span>
        </div>

        <p className="text-sm text-muted-foreground">
          Your trusted partner for all home services.
        </p>
      </div>

      {/* LINKS */}
      <div>
        <h4 className="font-semibold mb-3">Quick Links</h4>

        <ul className="space-y-2 text-sm text-muted-foreground">

          <li>
            <Link to="/services" className="hover:text-black transition">
              Services
            </Link>
          </li>

          <li>
            <Link to="/login" className="hover:text-black transition">
              Sign In
            </Link>
          </li>

          <li>
            <Link to="/signup" className="hover:text-black transition">
              Sign Up
            </Link>
          </li>

        </ul>
      </div>

      {/* CONTACT */}
      <div>
        <h4 className="font-semibold mb-3">Contact</h4>

        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <Mail className="h-4 w-4" /> support@homeserv.com
          </li>
          <li className="flex items-center gap-2">
            <Phone className="h-4 w-4" /> +1 (555) 123-4567
          </li>
          <li className="flex items-center gap-2">
            <MapPin className="h-4 w-4" /> 123 Service St, City
          </li>
        </ul>
      </div>

    </div>

    <div className="border-t py-4 text-center text-xs text-muted-foreground">
      © {new Date().getFullYear()} HomeServ. All rights reserved.
    </div>
  </footer>
);

export default Footer;