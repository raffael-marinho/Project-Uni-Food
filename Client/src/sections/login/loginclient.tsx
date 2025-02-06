import { uni } from "@/assets/imagens";

function LoginClient() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <img src={uni} alt="logo da unifood" className="w-[100px] h-[128px]"/>
            <h1>LoginClient</h1>
        </div>
    );
}   
export default LoginClient;