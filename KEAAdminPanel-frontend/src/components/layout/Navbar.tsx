import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Classes", path: "/classes" },
    { label: "Contact", path: "#" },
    { label: "About Us", path: "#" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#072C55]/90 backdrop-blur-md border-b border-yellow-500/20 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* Logo and Brand */}
        <div 
          className="flex items-center gap-4 cursor-pointer group" 
          onClick={() => navigate("/")}
        >
          <div className="relative overflow-hidden rounded-full border border-yellow-500/20 group-hover:border-yellow-500/50 transition-colors duration-300">
            <img
              src="/logo.png"
              alt="logo"
              className="w-12 h-12 md:w-14 md:h-14 object-cover transform group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent group-hover:from-yellow-300 group-hover:to-yellow-500 transition-colors duration-300">
              Karachi Education Academy
            </h1>
            <p className="text-[10px] md:text-xs text-yellow-500/80 tracking-widest uppercase font-semibold">
              Inspiring Excellence
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`
                  px-4 py-2
                  rounded-full
                  text-sm
                  font-bold
                  tracking-wide
                  transition-all duration-300
                  ${isActive 
                    ? "bg-yellow-500 text-black shadow-md shadow-yellow-500/20" 
                    : "text-slate-200 hover:text-yellow-300 hover:bg-white/5"
                  }
                `}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

      </div>
    </header>
  );
};

export default Navbar;

