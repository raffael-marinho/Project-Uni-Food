import  Navbar  from "@/components/Navbar";
import NavInferior from "@/components/Navinferior"; 


function Homepage() {

    return (
        <div className="flex flex-col  h-screen overflow-x-hidden">
            <   Navbar />

            <h1 className="pt-16 justify-center items-center text-4xl font-semibold">Homepage</h1>
            <div className="h-13"> </div> 

            <NavInferior />
        </div>
    )
}
export default Homepage;