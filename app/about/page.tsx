"use client";

export const AboutPage = () => {
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
