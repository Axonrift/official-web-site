export function BrandWordmark({
  tone = "auto",
}: {
  tone?: "auto" | "light" | "dark";
}) {
  return (
    <svg
      className={`wordmark${tone === "auto" ? " wordmark-auto" : ""}`}
      viewBox="0 0 2048 447"
      aria-hidden="true"
      focusable="false"
    >
      <image
        href="/brand/axonrift-wordmark.png"
        width="2048"
        height="447"
        filter={tone === "light" ? "url(#axonrift-wordmark-light)" : undefined}
      />
    </svg>
  );
}
