const paths = {
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
    </>
  ),
  moon: <path d="M20.8 13.1A8.9 8.9 0 0 1 10.9 3.2a8.9 8.9 0 1 0 9.9 9.9Z" />,
  arrow: <path d="M5 12h13m-5-5 5 5-5 5" />,
  "up-right": <path d="M6 18 18 6M8 6h10v10" />,
  window: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18m-14-2.5h.01m3 0h.01m-1 6h6m-6 4h4" />
    </>
  ),
  mobile: (
    <>
      <rect x="6.5" y="2.75" width="11" height="18.5" rx="2.5" />
      <path d="M10 6h4m-2 12h.01" />
    </>
  ),
  layers: <path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5m-18 4 9 5 9-5" />,
  box: (
    <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Zm0 9 8-4.5M12 12 4 7.5M12 12v9" />
  ),
};

export function Icon({ name }: { name: keyof typeof paths }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      {paths[name]}
    </svg>
  );
}
