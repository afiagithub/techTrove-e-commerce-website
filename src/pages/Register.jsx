import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import SocialLogin from "../components/SocialLogin";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/shared/LoadingSpinner";

const Register = () => {
    const { createUser, updateUserProfile, setUser } = useAuth();
    const navigate = useNavigate();

    const axiosPublic = useAxiosPublic();
    const { data: districtData = [], isLoading: distLoading } = useQuery({
        queryKey: ['districts'],
        queryFn: async () => {
            const res = await axiosPublic.get('/districts')
            return res.data
        }
    })

    const [show, setShow] = useState(false);
    const handleToggle = () => {
        setShow(!show);
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const { fullName, email, pass, confirmPass, photo, division, dist, address } = data;
        console.log(data)
        if (pass.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }
        else if (!/^(?=.*[a-z])(?=.*[A-Z]).+$/.test(pass)) {
            toast.error("Password must have a uppercase and a lowercase letter");
            return;
        }
        else if (pass !== confirmPass) {
            toast.error("Password does not match Confirm Password");
            return;
        }
        createUser(email, pass)
            .then((result) => {
                updateUserProfile(fullName, photo)
                    .then(async () => {
                        console.log(result)
                        setUser({ ...result.user, photoURL: photo, displayName: fullName })
                        const userInfo = {
                            name: fullName,
                            email,
                            photo: photo || 'https://i.ibb.co/QnTrVRz/icon.jpg',
                            division,
                            dist,
                            address,
                            status: 'active'
                        }
                        const res = await axiosPublic.post("/users", userInfo);
                        console.log(res);
                        if (res.data.insertedId) {
                            navigate('/')
                            toast.success("Successfully Registered")
                        }
                    });
            })
            .catch((error) => {
                console.log(error.message)
            });
    }
    if (distLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div className="flex flex-col max-w-md mx-auto p-6 rounded-md sm:p-10 mb-10 font-rale">
            <div className="mb-8 text-center">
                <h1 className="my-3 text-4xl font-bold text-primary font-sans">Become A Member</h1>
                <p className="text-sm dark:text-black">Create your account By Providing Information Below</p>
            </div>
            <SocialLogin></SocialLogin>
            <div className="mt-5 flex flex-row items-center gap-4">
                <hr className="flex-grow" />
                <p className="text-primary font-sans">Or Register Using Email</p>
                <hr className="flex-grow" />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 mt-5">
                <div className="space-y-4">
                    <div>
                        <label className="block mb-2 text-sm font-bold">Full Name</label>
                        <input type="text" name="name" placeholder="Your Full Name" {...register("fullName")}
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-bold">Email address</label>
                        <input type="email" name="email" placeholder="Your Email Address" {...register("email", { required: true })}
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
                    </div>
                    {errors.email && <span className="text-red-700 font-semibold">This field is required</span>}
                    <div>
                        <label className="block mb-2 text-sm font-bold">Photo URL (Optional)</label>
                        <input type="text" name="photo" {...register("photo")}
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm">Division</label>
                        <select name="division" {...register("division")} defaultValue='default'
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800">
                            <option value="default" disabled>Your Division</option>
                            <option value='Dhaka'>Dhaka</option>
                            <option value='Rajshahi'>Rajshahi</option>
                            <option value='Barishal'>Barishal</option>
                            <option value='Khulna'>Khulna</option>
                            <option value='Sylhet'>Sylhet</option>
                            <option value='Mymensingh'>Mymensingh</option>
                            <option value='Rangpur'>Rangpur</option>
                            <option value='Chittagong'>Chittagong</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm">District</label>
                        <select name="dist" {...register("dist")} defaultValue='default'
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800">
                            <option value="default" disabled>Your District</option>
                            {
                                districtData.map(district =>
                                    <option key={district._id} value={district.name}>{district.name}</option>)
                            }
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-bold">Delivery address</label>
                        <input type="address" name="address" placeholder="Where you want us to deliver your products" {...register("address", { required: true })}
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
                    </div>
                    {errors.address && <span className="text-red-700 font-semibold">This field is required</span>}

                    <div className="relative">
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-bold">Password</label>
                        </div>
                        <input type={show ? "text" : "password"} name="password" id="password" placeholder="*****" {...register("pass", { required: true })}
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
                        <div className="absolute top-10 right-4 text-lg" onClick={handleToggle}>
                            {show ? <FaEyeSlash /> : <FaRegEye />}
                        </div>
                    </div>
                    {errors.pass && <span className="text-red-700 font-semibold">This field is required</span>}
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-bold">Confirm Password</label>
                        </div>
                        <input type="password" name="password" id="con-password" placeholder="*****" {...register("confirmPass", { required: true })}
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
                    </div>
                    {errors.confirmPass && <span className="text-red-700 font-semibold">This field is required</span>}
                </div>
                <div>
                    <input type="submit" value="Sign Up"
                        className="w-full px-8 py-3 bg-primary text-white text-lg font-semibold rounded-xl 
                            border-2 border-primary hover:border-primary hover:bg-transparent 
                            hover:text-primary" />
                    <p className="mt-4 px-6 text-sm text-center dark:text-black font-semibold">Already have an account?
                        <Link to="/login" className="hover:underline dark:text-primary font-bold ml-2">
                            Sign in</Link>.
                    </p>
                </div>

            </form>
        </div>
    );
};

export default Register;