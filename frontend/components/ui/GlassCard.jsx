const GlassCard = ({ children, className = "" }) => {
  return (
    <div className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-6 hover:bg-white/10 transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;