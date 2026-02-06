export default function Button({
    children,
    onClick,
    variant = "primary",
    disabled = false,
  }) {
    const styles = {
      primary: "bg-black text-white",
      secondary: "bg-gray-200 text-black",
      danger: "bg-red-500 text-white",
    };
  
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className={`w-full py-2 rounded ${
          styles[variant]
        } disabled:opacity-50`}
      >
        {children}
      </button>
    );
  }
  