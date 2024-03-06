import TButton from "@/components/TButton";

export default function index() {
    return (
        <div>
            <h2 className="prose">My components</h2>
            <div>
                <TButton />
                <div className="w-[146px] h-[56px] m-10 flex-center">
                    <button className="my-button"></button>
                </div>
                <div className="parent">
                    <span className="z-50"></span>
                    <div className="child1 flex-center">button</div>
                    <div className="child3"></div>
                    <div className="child2"></div>
                </div>
            </div>
            <div>
                <div className="bg-card-1 w-[300px] h-[500px]"></div>
            </div>
        </div>
    );
}
