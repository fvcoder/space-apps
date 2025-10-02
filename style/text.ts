import { tv } from "tailwind-variants";

export const textVariants = tv({
  base: "font-sans text-label",
  variants: {
    size: {
      h1: "text-5xl leading-[1.2] tracking-tight md:text-6xl",
      h2: "text-4xl leading-[1.25] tracking-tight md:text-5xl",
      h3: "text-3xl leading-[1.3] tracking-normal md:text-4xl",
      base: "text-base leading-relaxed tracking-normal",
      sm: "text-sm leading-relaxed tracking-normal",
      xs: "text-xs leading-snug tracking-wide",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    color: {
      primary: "text-label",
      secondary: "text-label-secondary text-zinc-500",
      tertiary: "text-label-tertiary",
      quaternary: "text-quaternary-label",
    },
  },
  defaultVariants: {
    size: "base",
    weight: "normal",
    color: "primary",
  },
});
