import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import SocialLogin from "../components/SocialLogin"
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../hooks/useAuth";

const Login = () => {
    const { signInUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state || '/';

    const [show, setShow] = useState(false);

    const handleToggle = () => {
        setShow(!show);
    }
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const { email, pass } = data;
        signInUser(email, pass)
            .then((result) => {
                if (result.user)
                    navigate(`${from}`)
                toast.success("Successfully Logged In")
            })
            .catch(() => {
                toast.error("Invalid Credential")
            });
    }
    return (
        <div className="flex flex-col max-w-md mx-auto p-6 rounded-md sm:p-10 mb-10 font-rale">
            <div className="mb-8 text-center">
                <h1 className="my-3 text-4xl font-bold font-sans text-primary">Welcome Back, User</h1>
                <p className="text-sm dark:text-black">Please Log in to access your account</p>
            </div>
            <SocialLogin></SocialLogin>
            <div className="mt-5 flex flex-row items-center gap-4">
                <hr className="flex-grow" />
                <p className="text-primary font-sans">Or Sign In Using Email</p>
                <hr className="flex-grow" />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 mt-5">
                <div className="space-y-4">
                    <div>
                        <label className="block mb-2 text-sm font-bold">Email address</label>
                        <input type="email" name="email" placeholder="Your Email Address" {...register("email", { required: true })}
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
                    </div>
                    {errors.email && <span className="text-red-700 font-semibold">This field is required</span>}
                    <div className="relative">
                        <div className="flex justify-between mb-2">
                            <label htmlFor="password" className="text-sm font-bold">Password</label>
                            <a rel="noopener noreferrer" href="#" className="text-xs hover:underline dark:text-black">Forgot password?</a>
                        </div>
                        <input type={show ? "text" : "password"} name="password" {...register("pass", { required: true })}
                            placeholder="*******" {...register("pass", { required: true })}
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
                        <div className="absolute top-10 right-4 text-lg" onClick={handleToggle}>
                            {show ? <FaEyeSlash /> : <FaRegEye />}
                        </div>
                    </div>
                    {errors.pass && <span className="text-red-700 font-semibold">This field is required</span>}
                </div>
                <div>
                    <input type="submit" value="Sign In"
                        className="w-full px-8 py-3 bg-primary text-white text-lg font-semibold rounded-xl 
                            border-2 border-primary hover:border-primary hover:bg-transparent 
                            hover:text-primary" />
                </div>
            </form>
            <p className="px-6 text-sm text-center font-rale font-semibold mt-5">Don't have an account?
                <Link to="/register" className="hover:underline dark:text-primary font-bold ml-2">
                    Sign up</Link>.
            </p>
        </div>
    );
};

export default Login;