export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8.9-.2.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.2.2-.4.1-.2 0-.3 0-.4C10 8.7 9.6 7.7 9.4 7.3c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s1 2.6 1.1 2.7c.1.2 1.9 3 4.7 4.1.7.3 1.2.4 1.6.5.7.2 1.3.2 1.8.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  );
}

export function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L7.9 9.9a16 16 0 0 0 6 6l1.4-1.4a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

export function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

export function GoogleGIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-3.1-.4-4.6H24v8.7h11.9c-.5 2.8-2.1 5.2-4.4 6.8v5.6h7.2c4.2-3.9 6.4-9.6 6.4-16.5Z" />
      <path fill="#34A853" d="M24 46c6 0 11-2 14.7-5.4l-7.2-5.6c-2 1.3-4.6 2.1-7.5 2.1-5.8 0-10.7-3.9-12.4-9.2H4.2v5.8C7.9 41.1 15.4 46 24 46Z" />
      <path fill="#FBBC05" d="M11.6 27.9a13.9 13.9 0 0 1 0-8.9v-5.8H4.2a22 22 0 0 0 0 20.5l7.4-5.8Z" />
      <path fill="#EA4335" d="M24 10.9c3.2 0 6.1 1.1 8.4 3.3l6.3-6.3C34.9 4.3 30 2 24 2 15.4 2 7.9 6.9 4.2 14.1l7.4 5.8c1.7-5.3 6.6-9.2 12.4-9.2Z" />
    </svg>
  );
}

export function CarSilhouette({ className, stroke = "#8d93a0" }: { className?: string; stroke?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 100" fill="none" aria-hidden="true">
      <path
        d="M10 62c0-5 6-8 13-9l16-17c5-5 11-8 18-8h48c8 0 15 4 20 9l13 15c8 1 15 5 15 11v7a5 5 0 0 1-5 5h-7a16 16 0 1 1-32 0H68a16 16 0 1 1-32 0H15a5 5 0 0 1-5-5v-7Z"
        stroke={stroke}
        strokeWidth={2}
      />
    </svg>
  );
}
