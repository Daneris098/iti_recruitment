import { TextRendererProps } from "@modules/Shared/types";

export const TextRenderer = ({ as = 'p', className = '', children }: TextRendererProps) => {
    const Component = as;
    const baseClass = 'poppins'; // No color hardcoded
    return <Component className={`${baseClass} ${className}`}>{children}</Component>;
};
