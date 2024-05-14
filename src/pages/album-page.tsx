import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import Panel from "@/components/ui/panel";

const AlbumPage = () => {
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <Panel className="mx-[10px] my-[5px] md:mx-[40px] md:my-[20px] h-[85vh] md:h-[85vh] gap-[10px] grid grid-cols-1 md:grid-cols-3 content-start"></Panel>
      </ThemeProvider>
    </div>
  );
};

export default AlbumPage;
