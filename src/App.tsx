import { RouterProvider } from "react-router-dom";
import router from "@src/routes/Router";
import { Toaster } from "sonner";

export default function App() {

  // url profiler
  let previousUrl = '';
  const observer = new MutationObserver(function () {
    if (location.href !== previousUrl) {
      previousUrl = location.href;
    }
  });
  const config = { subtree: true, childList: true };
  observer.observe(document, config);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </>
  );
}
