import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

const SocialLogin = () => {
    const { googleLogin, githubLogin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state || '/';

    const handleSocialLogin = (socialProvider) => {
        socialProvider()
            .then(result => {
                if (result.user) {
                    toast.success("Successfully Logged In")
                    navigate(`${from}`)
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