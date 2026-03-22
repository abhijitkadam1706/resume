import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = ({ links, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#080e1a]/85 py-3 backdrop-blur-xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <a
          href="#home"
          className="text-[1.05rem] font-semibold uppercase tracking-[0.16em] text-white"
        >
          {name}
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm text-[#a6abbb] transition-colors hover:text-white"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full border border-[#ff8d86]/50 px-4 py-2 text-sm text-[#ffb8b2] transition-colors hover:border-[#ff8d86] hover:text-white"
          >
            Open Channel
          </a>
        </div>

        <button
          onClick={() => setIsOpen((open) => !open)}
          className="rounded-full border border-white/10 p-2 text-[#a6abbb] transition-colors hover:text-white md:hidden"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-b border-white/10 bg-[#080e1a]/96 px-5 py-5 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm uppercase tracking-[0.14em] text-[#a6abbb] transition-colors hover:text-white"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-2 w-fit rounded-full border border-[#ff8d86]/50 px-4 py-2 text-sm text-[#ffb8b2]"
            >
              Open Channel
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
