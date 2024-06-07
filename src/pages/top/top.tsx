import { Card } from "@/components/ui/card";
import Panel from "@/components/ui/panel";
import { MaterialSymbol } from "react-material-symbols";
import { Link } from "react-router-dom";

export const Top = () => {
  return (
    <Panel className="h-full grid grid-cols-1 md:grid-cols-2 gap-6 p-6 content-start">
      <Link to="/top/likes">
        <Card className="flex items-center justify-center gap-4 text-[45px] p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl border-8 border-white">
          <MaterialSymbol icon="favorite" className="text-white" />
          <span>Топ по лайкам</span>
        </Card>
      </Link>
      <Link to="/top/listens">
        <Card className="flex items-center justify-center gap-4 text-[45px] p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl border-8 border-white">
          <MaterialSymbol icon="headphones" className="text-white" />
          <span>Топ по просмотрам</span>
        </Card>
      </Link>
    </Panel>
  );
};
