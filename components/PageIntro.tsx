"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type PageIntroProps = {
  title?: string;
  subtitle?: string;
};

export default function PageIntro({
  title = "BARBER CLUB",
  subtitle = "Precisión · Estilo · Presencia",
}: PageIntroProps) {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#0b0b0b]"
        >
          {/* FONDO */}
          <motion.div
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 1.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,169,126,0.10),transparent_45%)]"
          />

          {/* CONTENIDO */}
          <div className="relative z-20 px-6 text-center">
            <motion.p
              initial={{
                opacity: 0,
                y: 18,
                letterSpacing: "0.25em",
              }}
              animate={{
                opacity: 1,
                y: 0,
                letterSpacing: "0.18em",
              }}
              transition={{
                delay: 0.15,
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-2xl font-semibold tracking-[0.18em] text-[#f3eee7] md:text-4xl"
            >
              {title}
            </motion.p>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 100 }}
              transition={{
                delay: 0.55,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mx-auto mt-6 h-[1px] bg-[#c8a97e]"
            />

            <motion.p
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.85,
                duration: 0.7,
              }}
              className="mt-5 text-[9px] uppercase tracking-[0.38em] text-[#c8a97e] md:text-[10px]"
            >
              {subtitle}
            </motion.p>
          </div>

          {/* CORTINA DE SALIDA */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{
              y: ["100%", "100%", "0%", "-100%"],
            }}
            transition={{
              times: [0, 0.62, 0.82, 1],
              duration: 2.2,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="absolute inset-0 z-30 bg-[#c8a97e]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}