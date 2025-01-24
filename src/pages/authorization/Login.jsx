import React, { useState } from "react";
import {
  Link,
  Navigate,
  redirect,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Form from "../../components/common/Form";
import { loginFormControls } from "../../components/config";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/authorization-slice/auths";
import { useToast } from "../../hooks/use-toast";

const initialState = {
  email: "",
  password: "",
};

const login = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation();
  const { toast } = useToast();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      console.log("data:", data);
      if (!formData.email || !formData.password) {
        toast({
          title: "Please fill in all fields.",
          variant: "destructive",
          style: { backgroundColor: "e85f5c", padding: "12px" },
        });
      }

      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        // setTimeout(() => navigate("/shop/home"), 1000);
      } else {
        toast({
          title: "Incorrect password. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold  text-gray-600 uppercase">
          Sign your account
        </h1>
      </div>
      <Form
        formControls={loginFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        required={"required"}
      />
      <div className="text-center">
        <p className="mt-2">
          Don't have an account?
          <Link
            to="/auth/register"
            className="font-medium text-primary hover:underline ml-2 text-red-700"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default login;
