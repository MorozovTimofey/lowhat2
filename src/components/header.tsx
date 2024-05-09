import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { Card } from "./ui/card";
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
              <Button variant="secondary">Песни</Button>
              <Button variant="secondary">Альбомы</Button>
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
