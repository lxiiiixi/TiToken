export default function TButton({
    type = "primary",
    width,
    className,
    handleClick,
    children,
}: {
    type?: "primary" | "secondary";
    width?: string;
    height?: string;
    className?: string;
    handleClick?: () => void;
    children: React.ReactNode;
}) {
    const bgColor = type === "primary" ? "var(--primary-color)" : "#988f34";

    return (
        <div
            className={`parent relative cursor-pointer text-center min-h-[45px] mx-auto my-4 rounded-[3px] ${className}`}
            style={{ width }}
            onClick={handleClick}
        >
            <div
                className="child1 w-full flex-center py-[8px] px-[25px] rounded-[3px] clip-path-1 md:clip-path-2"
                style={{
                    backgroundColor: bgColor,
                }}
            >
                {children}
            </div>
            <div className="child2 w-full absolute-top rounded-[3px] flex-center clip-path-1 md:clip-path-2">
                <div className="grandchild w-full py-2 px-6 text-transparent rounded-[3px] clip-path-1 md:clip-path-2">
                    {children}
                </div>
            </div>
        </div>
    );
}
