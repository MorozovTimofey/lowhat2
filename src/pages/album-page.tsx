import { ThemeProvider } from "@/components/theme-provider";
import Panel from "@/components/ui/panel";

const AlbumPage = () => {
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Panel className="h-[100%]"></Panel>
      </ThemeProvider>
    </div>
  );
};

export default AlbumPage;
