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
            className={`parent relative cursor-pointer text-center min-h-[45px] mx-auto my-4 ${className}`}
            style={{ width }}
            onClick={handleClick}
        >
            <div
                className="child1 flex-center py-[8px] px-[25px]"
                style={{
                    backgroundColor: bgColor,
                }}
            >
                {children}
            </div>
            <div className="child2">
                <div className="grandchild py-2 px-6 text-transparent">{children}</div>
            </div>
        </div>
    );
}
