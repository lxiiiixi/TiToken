import React from "react";
import TCard from "@/components/TCard";

export default function Index() {
    return (
        <div className="relative">
            <TCard number={3} />
            <div className="absolute-top">111</div>
        </div>
    );
}
