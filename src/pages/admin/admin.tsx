import { Card } from "@/components/ui/card";
import Panel from "@/components/ui/panel";
import { MaterialSymbol } from "react-material-symbols";
import { Link } from "react-router-dom";

export const Admin = () => {
  return (
    <Panel className="h-full grid grid-cols-1 md:grid-cols-2 gap-6 p-6 content-start">
      <Link to="/admin/create">
        <Card className="flex items-center justify-center gap-4 text-[45px] p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl border-8 border-blue-500">
          <MaterialSymbol icon="add_circle" className="text-blue-500" />
          <span>Добавить</span>
        </Card>
      </Link>

      <Link to="/admin/delete">
        <Card className="flex items-center justify-center gap-4 text-[45px] p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl border-8 border-red-500">
          <MaterialSymbol icon="delete" className="text-red-500" />
          <span>Удалить</span>
        </Card>
      </Link>
    </Panel>
  );
};
