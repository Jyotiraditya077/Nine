import { Outlet } from "react-router-dom";

import DarkVeil from "../ui/DarkVeil";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12 relative">
        <DarkVeil />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-primary-foreground z-10">
            Welcome to N9NE STORE
          </h1>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
