import React, { useState } from "react";
import Form from "../../components/common/Form";
import { formControls } from "../../components/config";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/authorization-slice/auths";
import { useToast } from "@/hooks/use-toast";
import { Variable } from "lucide-react";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  console.log(formData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Check the contents of formData
    dispatch(registerUser(formData))
      .then((data) => {
        console.log(data);
        if (!formData.userName || !formData.email || !formData.password) {
          return toast({
            title: "Please fill in all fields.",
            variant: "destructive",
            style: { padding: "12px" },
          });
        }
        if (data?.payload?.success) {
          toast({
            title: data.payload.message,
          });
          navigate("/auth/login");
        } else {
          toast({
            title: "This email has already been registered.",
            variant: "destructive",
          });
        }
      })
      .catch((err) => {
        toast({
          title: err.message,
        });
      });
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-600">Create new account</h1>
      </div>
      <Form
        formControls={formControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <div className="text-center">
        <p className="mt-2">
          Already have an account?
          <Link
            to="/auth/login"
            className="font-medium text-primary hover:underline ml-2 text-red-700"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
