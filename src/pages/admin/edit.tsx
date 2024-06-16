import { Card } from "@/components/ui/card";
import Panel from "@/components/ui/panel";
import { MaterialSymbol } from "react-material-symbols";
import { Link } from "react-router-dom";

export const Edit = () => {
  return (
    <Panel className="h-full grid grid-cols-1 md:grid-cols-2 gap-6 p-6 content-start">
      <Link to="/admin/edit/track">
        <Card className="flex items-center justify-center gap-4 text-[45px] p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
          <span>Изменить трек</span>
        </Card>
      </Link>

      <Link to="/admin/edit/album">
        <Card className="flex items-center justify-center gap-4 text-[45px] p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl8">
          <span>Изменить альбом</span>
        </Card>
      </Link>

      <Link to="/admin/edit/genre">
        <Card className="flex items-center justify-center gap-4 text-[45px] p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl8">
          <span>Изменить жанр</span>
        </Card>
      </Link>

      <Link to="/admin/edit/artist">
        <Card className="flex items-center justify-center gap-4 text-[45px] p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl8">
          <span>Изменить артиста</span>
        </Card>
      </Link>
    </Panel>
  );
};
