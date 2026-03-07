import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const ParallaxScrollSecond = ({
    images,
    className,
}: {
    images: string[];
    className?: string;
}) => {
    const gridRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: gridRef,
        offset: ["start end", "end start"],
    });

    const filterBlur = useTransform(
        scrollYProgress,
        [0, 0.15, 0.85, 1],
        ["blur(15px)", "blur(0px)", "blur(0px)", "blur(15px)"]
    );
    const opacityFade = useTransform(
        scrollYProgress,
        [0, 0.15, 0.85, 1],
        [0, 1, 1, 0]
    );

    const translateYFirst = useTransform(scrollYProgress, [0, 1], [100, -300]);
    const translateYSecond = useTransform(scrollYProgress, [0, 1], [-300, 100]);
    const translateYThird = useTransform(scrollYProgress, [0, 1], [100, -300]);

    const third = Math.ceil(images.length / 3);

    const firstPart = images.slice(0, third);
    const secondPart = images.slice(third, 2 * third);
    const thirdPart = images.slice(2 * third);

    return (
        <div
            className={cn("items-start w-full relative", className)}
            ref={gridRef}
        >
            <motion.div
                style={{
                    filter: filterBlur,
                    opacity: opacityFade
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-full mx-auto gap-4 py-20 px-4"
            >
                <div className="grid gap-4">
                    {firstPart.map((el, idx) => (
                        <motion.div
                            style={{
                                y: translateYFirst,
                                willChange: "transform",
                            }}
                            key={"grid-1" + idx}
                        >
                            <img
                                src={el}
                                loading="lazy"
                                decoding="async"
                                className="h-80 md:h-[30rem] w-full object-cover object-left-top rounded-lg !m-0 !p-0 shadow-lg"
                                alt="thumbnail"
                            />
                        </motion.div>
                    ))}
                </div>
                <div className="grid gap-4">
                    {secondPart.map((el, idx) => (
                        <motion.div
                            style={{
                                y: translateYSecond,
                                willChange: "transform"
                            }}
                            key={"grid-2" + idx}
                        >
                            <img
                                src={el}
                                loading="lazy"
                                decoding="async"
                                className="h-80 md:h-[30rem] w-full object-cover object-left-top rounded-lg !m-0 !p-0 shadow-lg"
                                alt="thumbnail"
                            />
                        </motion.div>
                    ))}
                </div>
                <div className="grid gap-4">
                    {thirdPart.map((el, idx) => (
                        <motion.div
                            style={{
                                y: translateYThird,
                                willChange: "transform",
                            }}
                            key={"grid-3" + idx}
                        >
                            <img
                                src={el}
                                loading="lazy"
                                decoding="async"
                                className="h-80 md:h-[30rem] w-full object-cover object-left-top rounded-lg !m-0 !p-0 shadow-lg"
                                alt="thumbnail"
                            />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};
