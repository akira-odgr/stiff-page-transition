"use client";

import Link from "next/link";

export default function Home() {
    return (
        <div className="flex h-screen flex-col items-center justify-center gap-10">
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
            <div className="flex gap-10">
                <button>
                    <Link href={"/about"}>About</Link>
                </button>
                <button>
                    <Link href={"/contact"}>Contact</Link>
                </button>
            </div>
        </div>
    );
}
