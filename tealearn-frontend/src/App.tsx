import { AppRoutes } from "@/routes/AppRoutes";
import { Toaster } from "@/components/ui/sonner";
import { GlobalLoader } from "@/components/common/GlobalLoader";

function App() {
  return (
    <>
      <GlobalLoader />

      <AppRoutes />

      <Toaster richColors />
    </>
  );
}

export default App;