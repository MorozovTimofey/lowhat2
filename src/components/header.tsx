import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { Link, useNavigate } from "react-router-dom";
import { MaterialSymbol } from "react-material-symbols";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import "react-material-symbols/rounded";

const SHEET_SIDES = ["left"] as const;

interface HeaderProps {
  className?: string;
}

interface DecodedToken {
  role: string;
  exp: number;
  iat: number;
}

export default function Header({ className }: HeaderProps) {
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setRole(decoded.role);
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("access_token");
    navigate("/");
  };

  return (
    <header
      className={`w-full flex items-center justify-between px-[40px] ${className}`}
    >
      <div>
        {SHEET_SIDES.map((side) => (
          <Sheet key={side}>
            <SheetTrigger asChild>
              <Button variant="outline" className="border-none">
                <MaterialSymbol icon="menu" size={24} weight={400} />
              </Button>
            </SheetTrigger>
            <SheetContent side={side} className="flex flex-col pt-[50px]">
              <Link to="/genres">
                <Button variant="secondary" className="w-full flex gap-[7px]">
                  <MaterialSymbol icon="music_note" size={20} weight={400} />
                  <span>Песни</span>
                </Button>
              </Link>
              <Link to="/albums">
                <Button variant="secondary" className="w-full flex gap-[7px]">
                  <MaterialSymbol icon="album" size={20} weight={400} />
                  <span>Альбомы</span>
                </Button>
              </Link>
              <Link to="/artists">
                <Button variant="secondary" className="w-full flex gap-[7px]">
                  <MaterialSymbol icon="artist" size={20} weight={400} />
                  <span>Исполнители</span>
                </Button>
              </Link>
              <Link to="/top">
                <Button variant="secondary" className="w-full flex gap-[7px]">
                  <MaterialSymbol icon="equalizer" size={20} weight={400} />
                  <span>Топ</span>
                </Button>
              </Link>
              {role === "Admin" && (
                <Link to="/admin">
                  <Button variant="secondary" className="w-full flex gap-[7px]">
                    <MaterialSymbol
                      icon="admin_panel_settings"
                      size={20}
                      weight={400}
                    />
                    <span>Панель администратора</span>
                  </Button>
                </Link>
              )}
              <Button
                variant="secondary"
                className="w-full flex gap-[7px]"
                onClick={handleLogout}
              >
                <MaterialSymbol icon="logout" size={20} weight={400} />
                <span>Выйти</span>
              </Button>
            </SheetContent>
          </Sheet>
        ))}
      </div>
      <div className="font-semibold text-[24px]">LowHat</div>
      <div className="flex gap">
        <ModeToggle />
      </div>
    </header>
  );
}
