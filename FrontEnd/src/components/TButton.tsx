export default function TButton({
    type = "primary",
    width,
    height,
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
            className={`parent relative cursor-pointer text-center ${className}`}
            style={{ width, height }}
            onClick={handleClick}
        >
            <div
                className="child1 flex-center"
                style={{
                    backgroundColor: bgColor,
                }}
            >
                {children}
            </div>
            <div className="child2">
                <div className="grandchild"></div>
            </div>
        </div>
    );
}
