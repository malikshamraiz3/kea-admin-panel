import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#040E1B] border-t border-yellow-500/10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 text-white">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="flex flex-col">
            <h3 className="text-2xl font-black bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 bg-clip-text text-transparent mb-4">
              Karachi Education Academy
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Quality educational notes, solved past papers, and premium guess papers for Classes 9 to 12. Empowering students across Karachi to achieve academic excellence.
            </p>
            {/* Social Icons Mock */}
            <div className="flex gap-3">
              {["facebook", "twitter", "youtube", "instagram"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-xs text-slate-400 hover:text-yellow-300 hover:border-yellow-500 hover:bg-yellow-500/5 transition-all duration-300 capitalize font-medium"
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-extrabold text-yellow-300 mb-6 tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              {[
                { label: "Home", path: "/" },
                { label: "Classes", path: "/classes" },
                { label: "About Us", path: "#" },
                { label: "Contact Us", path: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.path} 
                    className="hover:text-yellow-300 flex items-center gap-1 group transition-colors duration-200"
                  >
                    <span className="opacity-0 w-0 group-hover:opacity-100 group-hover:w-4 transition-all duration-200 text-yellow-500 font-bold">
                      →
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-extrabold text-yellow-300 mb-6 tracking-wider uppercase">
              Get In Touch
            </h3>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-yellow-500 mt-0.5">📍</span>
                <span>Karachi, Sindh, Pakistan</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-500">📧</span>
                <a href="mailto:info@kea.com" className="hover:text-yellow-300 transition-colors">
                  info@kea.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-500">📞</span>
                <a href="tel:+923001234567" className="hover:text-yellow-300 transition-colors">
                  +92 300 1234567
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Karachi Education Academy. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300 transition">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
