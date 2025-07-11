import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [, setLocation] = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[hsl(220,39%,11%)] text-white">
      <h1 className="text-xl font-bold">Crisis Manager</h1>

      {/* Mobile Menu Toggle */}
      <button onClick={() => setOpen(!open)} className="lg:hidden">
        <Menu className="w-6 h-6" />
      </button>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center gap-4">
        <Button variant="ghost" onClick={() => setLocation("/login")}>
          Login
        </Button>
        <Button
          className="bg-[hsl(74,100%,40%)] text-black hover:bg-[hsl(74,100%,35%)]"
          onClick={() => setLocation("/register")}
        >
          Register
        </Button>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-[hsl(220,39%,11%)] flex flex-col gap-2 p-4 lg:hidden">
          <Button variant="ghost" onClick={() => setLocation("/login")}>
            Login
          </Button>
          <Button
            className="bg-[hsl(74,100%,40%)] text-black hover:bg-[hsl(74,100%,35%)]"
            onClick={() => setLocation("/register")}
          >
            Register
          </Button>
        </div>
      )}
    </nav>
  );
}
