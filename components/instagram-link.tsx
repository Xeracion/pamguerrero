interface InstagramLinkProps {
  className?: string;
}

/**
 * [PENDIENTE: enlazar a la cuenta real de Instagram de Pam Guerrero — no
 * se inventa una URL. El enlace apunta a un ancla inerte hasta entonces.]
 */
export function InstagramLink({ className = "" }: InstagramLinkProps) {
  return (
    <a
      href="#instagram-pendiente"
      title="Instagram — pendiente de conectar la cuenta real"
      aria-label="Instagram de Pam Guerrero (enlace pendiente)"
      className={className}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    </a>
  );
}
