import TButton from "@/components/TButton";

export default function index() {
    return (
        <div>
            <h2 className="prose">My components</h2>
            <div>
                <TButton disabled />
                <TButton />
            </div>
            <div>
                <div className="bg-card-1 w-[300px] h-[500px]"></div>
            </div>
        </div>
    );
}
