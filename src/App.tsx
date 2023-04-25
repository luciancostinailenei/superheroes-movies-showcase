import { QueryClient, QueryClientProvider } from "react-query";

import "./App.css";
import { Showcase } from "./layouts";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Showcase />
    </QueryClientProvider>
  );
}

export default App;
