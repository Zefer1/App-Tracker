import { Outlet } from "react-router";
import Footer from "./Footer";

export default function RootLayout() {
  return (
    <div>
      <Outlet />
      <Footer />
    </div>
  );
}
