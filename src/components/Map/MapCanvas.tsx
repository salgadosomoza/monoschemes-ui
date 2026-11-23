export function MapCanvas() {
  return (
    <svg className="map-canvas" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="320" height="180" fill="var(--color-bg-placeholder)" />
      <path d="M42 0v180M142 0v180M244 0v180M0 54h320M0 126h320" stroke="var(--color-bg-page)" strokeWidth="5" />
      <path d="M0 160 320 12" stroke="var(--color-bg-page)" strokeWidth="8" />
      <path d="M0 92h320M94 0v180" stroke="var(--color-border-default)" strokeWidth="1" />
      <path d="M210 106h110v74H210z" fill="var(--color-bg-page)" opacity=".55" />
      <path d="M28 12h30v26H28z" fill="var(--color-bg-page)" opacity=".55" />
    </svg>
  );
}
