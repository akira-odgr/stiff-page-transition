"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { useTransition } from "@/context/TransitionContext";

export const PageTransition = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const { getEntryAnimations } = useTransition();
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const isTransitioning = useRef(false);
    const hasPlayedInitial = useRef(false);
    const previousPathname = useRef<string | null>(null);

    useEffect(() => {
        if (hasPlayedInitial.current && !isTransitioning) {
            return;
        }

        playEntryAnimation();
        hasPlayedInitial.current = true;
    }, [pathname]);

    const playEntryAnimation = () => {
        const entryAnimationsFn = getEntryAnimations();
        const isRoutChange = previousPathname.current !== null;

        const entryTl = gsap.timeline({
            onComplete: () => {
                isTransitioning.current = false;
                previousPathname.current = pathname;
            },
        });

        // Overlay reveal (always the same)
        if (isRoutChange) {
            entryTl
                .set(overlayRef.current, {
                    translateY: "100%",
                    scale: 0.5,
                    rotate: 30,
                })
                .to(overlayRef.current, {
                    translateY: "0%",
                    rotate: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "power2.inOut",
                });
        }

        // Global page-content opacity (always happens)
        entryTl.to(".page-content", {
            opacity: 1,
            duration: 0.5,
            ease: "power2.inOut",
        });

        if (entryAnimationsFn) {
            if (entryAnimationsFn.length > 0) {
                const pageTl = gsap.timeline();

                const timelineFn = entryAnimationsFn as (
                    tl: gsap.core.Timeline
                ) => void;
                timelineFn(pageTl);
                entryTl.add(pageTl, "<");
            } else {
                const freeFn = entryAnimationsFn as () => void;
                entryTl.call(
                    () => {
                        freeFn();
                    },
                    [],
                    "<"
                );
            }
        }
        entryTl.play();
    };

    useEffect(() => {
        const handleClick = (e: Event) => {
            e.preventDefault();
            const href = (e.currentTarget as HTMLAnchorElement).getAttribute(
                "href"
            );

            if (href) {
                const url = new URL(href, window.location.origin).pathname;
                if (url !== pathname && !isTransitioning.current) {
                    isTransitioning.current = true;
                    hasPlayedInitial.current = false;
                    exitPage(url);
                }
            }
        };

        const links = document.querySelectorAll('a[href^="/"]');
        links.forEach((link) => {
            link.addEventListener("click", handleClick);
        });

        return () => {
            links.forEach((link) => {
                link.removeEventListener("click", handleClick);
            });
        };
    }, [pathname]);

    const exitPage = (url: string) => {
        const exitTl = gsap.timeline({
            onComplete: () => {
                router.push(url);
            },
        });

        exitTl.to(".page-content", {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
        });

        exitTl.to(
            overlayRef.current,
            {
                translateY: "-200%",
                rotate: -30,
                scale: 0.5,
                duration: 1.2,
                ease: "power2.inOut",
            },
            "-=0.3"
        );

        exitTl.play();
    };

    return (
        <>
            <div
                ref={overlayRef}
                className="transition-overlay fixed tip-0 left-0 -z-10 w-full h-full bg-[#2b3037]"
            />
            {children}
        </>
    );
};
