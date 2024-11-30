import { Outlet } from "react-router-dom";
import SideBar from "./partials/SideBar";

export default function DashboardLayout() {
  return (
    <>
      <div className="bg-gray-100 min-h-screen flex">
        <SideBar />

        <main className="flex-grow p-10">
          <Outlet />
        </main>
      </div>
    </>
  );
}
