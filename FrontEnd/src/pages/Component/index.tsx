import TButton from "@/components/TButton";
// import { Fire } from "@/assets";

export default function index() {
    return (
        <div>
            <div className="h-[200px] bg-pink-50">
                {/* <img src={Fire} className="  text-blue-400" style={{ color: "black" }} /> */}
            </div>
            <h2 className="prose">My components</h2>
            <div>
                <TButton />
                <TButton />
            </div>
            <div>
                <div className="bg-card-1 w-[300px] h-[500px]"></div>
                <div className="bg-card-2 w-[300px] h-[500px]"></div>
                <div className="bg-card-3 w-[300px] h-[500px]"></div>
            </div>
        </div>
    );
}
