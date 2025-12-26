const Button = ({ children, variant="primary", onClick, className="" }) => {
  const base = "px-4 py-2 rounded-lg font-medium transition-all text-sm flex items-center justify-center gap-2";
  const styles = {
    primary: "bg-slate-900 text-white hover:bg-slate-800",
    outline: "border border-slate-300 text-slate-700 hover:bg-slate-50",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
    ghost: "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
  };
  
  return (
    <button onClick={onClick} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
};
export default Button;