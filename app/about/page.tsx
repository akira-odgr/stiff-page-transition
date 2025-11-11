"use client";

import { useTransition } from "@/context/TransitionContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export const AboutPage = () => {
    const aboutContainerRef = useRef<HTMLDivElement | null>(null);
    const { setEntryAnimations } = useTransition();

    useGSAP(
        () => {
            setEntryAnimations(() => {
                gsap.from(".title", {
                    y: 100,
                    rotate: 10,
                    duration: 1,
                    ease: "back.out(1.7)",
                });

                gsap.from(".paragraph", {
                    y: 50,
                    rotate: 10,
                    duration: 0.8,
                    ease: "power2.out",
                });
            });
        },
        { scope: aboutContainerRef }
    );

    return (
        <>
            <div className="flex h-screen flex-col items-center justify-center gap-10">
                <div className="overflow-hidden">
                    <h1 className="title text-8xl leading-none font-bold uppercase">
                        About
                    </h1>
                </div>

                <p className="paragraph text-center w-[90%] lg:max-w-2xl">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Quos aliquid dolore sed at doloremque modi. Eveniet eius
                    delectus nesciunt hic.
                </p>
            </div>
            <div className="h-screen" />
        </>
    );
};

export default AboutPage;
