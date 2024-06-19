import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";

const SocialLogin = () => {
    const { googleLogin, githubLogin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state || '/';
    const axiosPublic = useAxiosPublic()

    const handleSocialLogin = (socialProvider) => {
        socialProvider()
            .then(async (result) => {
                if (result.user) {
                    const userInfo = {
                        name: result.user.displayName,
                        email: result.user.email,
                        photo: 'https://i.ibb.co/QnTrVRz/icon.jpg',
                        division: '',
                        dist: '',
                        address: '',
                        status: 'active'

                    }
                    const res = await axiosPublic.post("/users", userInfo);
                    if (res.data.insertedId) {
                        toast.success("Successfully Logged In")
                        navigate(`${from}`)
                        console.log({ message: 'success' });
                    }
                }
            });
    }

    return (
        <div>
            <div className="mt-3 flex flex-row items-center justify-center gap-5 ">
                <button onClick={() => handleSocialLogin(googleLogin)}
                    className="btn py-3 flex flex-row gap-2 bg-[#5d3fd380]">
                    Sign in with <FcGoogle className="text-2xl" />
                </button>
                <button onClick={() => handleSocialLogin(githubLogin)}
                    className="btn py-3 flex flex-row gap-2 bg-[#a91d3a80]">
                    Sign in with <FaGithub className="text-2xl" />
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;