export default function TButton({
    type = "primary",
    width = "180px",
    height = "50px",
}: {
    type?: "primary" | "secondary";
    width?: string;
    height?: string;
}) {
    const bgColor = type === "primary" ? "var(--primary-color)" : "#988f34";

    return (
        <div className="parent relative cursor-pointer" style={{ width, height }}>
            <div
                className="child1 flex-center"
                style={{
                    backgroundColor: bgColor,
                }}
            >
                button
            </div>
            <div className="child2">
                <div className="grandchild"></div>
            </div>
        </div>
    );
}
