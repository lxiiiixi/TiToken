export default function TButton({
    type = "primary",
    disabled = false,
    width = "180px",
    height = "50px",
}: {
    type?: "primary" | "secondary";
    disabled?: boolean;
    width?: string;
    height?: string;
}) {
    return (
        <div className="parent relative cursor-pointer" style={{ width, height }}>
            <div
                className="child1 flex-center"
                style={{
                    backgroundColor: disabled ? "var(--primary-color)" : "#988f34",
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
