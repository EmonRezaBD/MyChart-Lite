/**
 * MyChart-Lite brand logo.
 * A stylized medical cross inside a rounded square.
 * Inline SVG so it scales crisply and inherits theme colors.
 *
 * @param {object} props
 * @param {number} props.size - Logo width/height in pixels (default 48)
 * @param {string} props.className - Optional extra Tailwind classes
 */
function Logo({ size = 48, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="MyChart-Lite logo"
      className={className}
    >
      {/* Rounded square background */}
      <rect
        x="4"
        y="4"
        width="56"
        height="56"
        rx="14"
        fill="var(--color-brand-500)"
      />
      {/* Medical cross — vertical bar */}
      <rect x="27" y="14" width="10" height="36" rx="2" fill="white" />
      {/* Medical cross — horizontal bar */}
      <rect x="14" y="27" width="36" height="10" rx="2" fill="white" />
    </svg>
  );
}

export default Logo;
