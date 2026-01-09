export type ButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "accentOutline";

export interface ButtonProps {
  text: string;
  variant: ButtonVariant;
  hasIcon?: boolean;
  onClick?: () => void;
  className?: string;
}
