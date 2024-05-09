import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import Panel from "./components/ui/panel";
import { Card } from "./components/ui/card";
import { Label } from "./components/ui/label";

function App() {
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <Panel className="mx-[40px] my-[20px] h-[85vh] gap-[10px] grid grid-cols-1 md:grid-cols-3 content-start">
          <Card className="flex gap-[10px] items-center p-[10px] h-[100px]">
            <img
              src="https://sun9-54.userapi.com/impg/EA1eN2NN0PKR8t_v390Sku45WaJveVvdfiYikQ/PqtgK9_dqvQ.jpg?size=807x807&quality=96&sign=2437c8dc9723c54d99bc9961c81122f4&type=album"
              alt=""
              className="rounded-[20px] size-[82px] max-w-[82px]"
            />
            <div>
              <div>Название песни</div>
              <Label>Название группы</Label>
            </div>
          </Card>
          <Card className="flex gap-[10px] items-center p-[10px] h-[100px]">
            <img
              src="https://sun9-54.userapi.com/impg/EA1eN2NN0PKR8t_v390Sku45WaJveVvdfiYikQ/PqtgK9_dqvQ.jpg?size=807x807&quality=96&sign=2437c8dc9723c54d99bc9961c81122f4&type=album"
              alt=""
              className="rounded-[20px] size-[82px] max-w-[82px]"
            />
            <div>
              <div>Название песни</div>
              <Label>Название группы</Label>
            </div>
          </Card>
          <Card className="flex gap-[10px] items-center p-[10px] h-[100px]">
            <img
              src="https://sun9-54.userapi.com/impg/EA1eN2NN0PKR8t_v390Sku45WaJveVvdfiYikQ/PqtgK9_dqvQ.jpg?size=807x807&quality=96&sign=2437c8dc9723c54d99bc9961c81122f4&type=album"
              alt=""
              className="rounded-[20px] size-[82px] max-w-[82px]"
            />
            <div>
              <div>Название песни</div>
              <Label>Название группы</Label>
            </div>
          </Card>
          <Card className="flex gap-[10px] items-center p-[10px] h-[100px]">
            <img
              src="https://sun9-54.userapi.com/impg/EA1eN2NN0PKR8t_v390Sku45WaJveVvdfiYikQ/PqtgK9_dqvQ.jpg?size=807x807&quality=96&sign=2437c8dc9723c54d99bc9961c81122f4&type=album"
              alt=""
              className="rounded-[20px] size-[82px] max-w-[82px]"
            />
            <div>
              <div>Название песни</div>
              <Label>Название группы</Label>
            </div>
          </Card>
          <Card className="flex gap-[10px] items-center p-[10px] h-[100px]">
            <img
              src="https://sun9-54.userapi.com/impg/EA1eN2NN0PKR8t_v390Sku45WaJveVvdfiYikQ/PqtgK9_dqvQ.jpg?size=807x807&quality=96&sign=2437c8dc9723c54d99bc9961c81122f4&type=album"
              alt=""
              className="rounded-[20px] size-[82px] max-w-[82px]"
            />
            <div>
              <div>Название песни</div>
              <Label>Название группы</Label>
            </div>
          </Card>
          <Card className="flex gap-[10px] items-center p-[10px] h-[100px]">
            <img
              src="https://sun9-54.userapi.com/impg/EA1eN2NN0PKR8t_v390Sku45WaJveVvdfiYikQ/PqtgK9_dqvQ.jpg?size=807x807&quality=96&sign=2437c8dc9723c54d99bc9961c81122f4&type=album"
              alt=""
              className="rounded-[20px] size-[82px] max-w-[82px]"
            />
            <div>
              <div>Название песни</div>
              <Label>Название группы</Label>
            </div>
          </Card>
          <Card className="flex gap-[10px] items-center p-[10px] h-[100px]">
            <img
              src="https://sun9-54.userapi.com/impg/EA1eN2NN0PKR8t_v390Sku45WaJveVvdfiYikQ/PqtgK9_dqvQ.jpg?size=807x807&quality=96&sign=2437c8dc9723c54d99bc9961c81122f4&type=album"
              alt=""
              className="rounded-[20px] size-[82px] max-w-[82px]"
            />
            <div>
              <div>Название песни</div>
              <Label>Название группы</Label>
            </div>
          </Card>
        </Panel>
      </ThemeProvider>
    </div>
  );
}

export default App;
