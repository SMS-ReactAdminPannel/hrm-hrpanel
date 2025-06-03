export function Button({
    children,
    onClick,
    className = "",
    disabled = false,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
  }) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`bg-[#006666] hover:bg-[#004C4C] text-white px-5 py-2 rounded-xl font-medium transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        {children}
      </button>
    );
  }