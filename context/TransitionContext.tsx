"use client";

import { createContext, ReactNode, useContext, useRef } from "react";

type TimelineAnimationFn = (fn: gsap.core.Timeline) => void;
type FreeAnimationFn = () => void;
type AnimationFn = TimelineAnimationFn | FreeAnimationFn;

interface TransitionContextType {
    setEntryAnimations: (fn: AnimationFn) => void;
    getEntryAnimations: () => AnimationFn | null;
}

const TransitionContext = createContext<TransitionContextType | undefined>(
    undefined
);

export const TransitionProvider = ({ children }: { children: ReactNode }) => {
    const entryAnimations = useRef<AnimationFn | null>(null);

    return (
        <TransitionContext.Provider
            value={{
                setEntryAnimations: (fn) => {
                    entryAnimations.current = fn;
                },
                getEntryAnimations: () => entryAnimations.current,
            }}
        >
            {children}
        </TransitionContext.Provider>
    );
};

export function useTransition() {
    const context = useContext(TransitionContext);
    if (!context) {
        throw new Error("useTransition must be used within TransitionProvider");
    }
    return context;
}
