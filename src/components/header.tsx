import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { Link } from "react-router-dom";
import { MaterialSymbol } from "react-material-symbols";
import "react-material-symbols/rounded";

const SHEET_SIDES = ["left"] as const;

export default function Header() {
  return (
    <header className="w-full h-[70px] flex items-center justify-between px-[40px] border-b-2 border-solid">
      <div>
        {SHEET_SIDES.map((side) => (
          <Sheet key={side}>
            <SheetTrigger asChild>
              <Button variant="outline">
                <MaterialSymbol icon="menu" size={14} weight={600} />
              </Button>
            </SheetTrigger>
            <SheetContent side={side} className="flex flex-col pt-[50px]">
              <Link to="/tracks">
                <Button variant="secondary" className="w-full">
                  Песни
                </Button>
              </Link>
              <Link to="/albums">
                <Button variant="secondary" className="w-full">
                  Альбомы
                </Button>
              </Link>
            </SheetContent>
          </Sheet>
        ))}
      </div>
      <div className="font-semibold text-[24px]">LowHat</div>
      <div className="flex gap ">
        <ModeToggle />
      </div>
    </header>
  );
}
