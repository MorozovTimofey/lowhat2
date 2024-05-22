import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { Link } from "react-router-dom";
import { MaterialSymbol } from "react-material-symbols";
import "react-material-symbols/rounded";

const SHEET_SIDES = ["left"] as const;

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
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
              <Link to="/">
                <Button variant="secondary" className="w-full">
                  Песни
                </Button>
              </Link>
              <Link to="/albums">
                <Button variant="secondary" className="w-full">
                  Альбомы
                </Button>
              </Link>
              <Link to="/artists">
                <Button variant="secondary" className="w-full">
                  Исполнители
                </Button>
              </Link>
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
