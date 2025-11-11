"use client";

import { useTransition } from "@/context/TransitionContext";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Home() {
    const { setEntryAnimations } = useTransition();
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        setEntryAnimations((tl) => {
            tl.from(".title", {
                yPercent: 100,
                duration: 0.8,
                ease: "power2.inOut",
            }).from(".paragraph", {
                yPercent: 100,
                duration: 0.8,
                ease: "power2.inOut",
            });
        });
    });

    return (
        <div
            ref={containerRef}
            className="flex h-screen flex-col items-center justify-center gap-10"
        >
            <div className="overflow-hidden">
                <h1 className="title text-8xl leading-none font-bold uppercase">
                    Home
                </h1>
            </div>
            <div className="w-[90%] overflow-hidden l:max-w-2xl">
                <p className="paragraph text-center">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Quos aliquid dolore sed at doloremque modi. Eveniet eius
                    delectus nesciunt hic.
                </p>
            </div>
        </div>
    );
}
