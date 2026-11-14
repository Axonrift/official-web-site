export function BrandWordmark({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <svg className="wordmark" viewBox="0 0 2048 447" aria-hidden="true" focusable="false">
      <image href="/brand/axonrift-wordmark.png" width="2048" height="447" filter={tone === "light" ? "url(#axonrift-wordmark-light)" : undefined} />
    </svg>
  );
}
