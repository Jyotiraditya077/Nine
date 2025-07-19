import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Preloader from "@/components/ui/Preloader";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const data = await dispatch(loginUser(formData));
    setLoading(false);

    if (data?.payload?.success) {
      toast({
        title: data?.payload?.message,
      });
    } else {
      toast({
        title: data?.payload?.message,
        variant: "destructive",
      });
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen bg-white">
        <Preloader type="video" className="w-[800px] h-[600px]" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <button
        onClick={() => window.location.href = "/shop/home"}
        className="mt-4 flex items-center gap-2 text-sm text-primary hover:underline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Shop
      </button>
    </div>
  );
}

export default AuthLogin;
