export default function TrustBadge({ icon: Icon, text, variant = 'default' }) {
  const variants = {
    default: 'bg-surface text-text-secondary border-border-light',
    success: 'bg-verified-bg text-green-700 border-green-100',
    accent: 'bg-accent/10 text-charcoal border-accent/20',
  };

  return (
    <div
      className={`
        inline-flex items-center gap-2 px-3 py-2
        text-xs font-medium rounded-lg border
        ${variants[variant]}
      `}
    >
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      <span>{text}</span>
    </div>
  );
}
