import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Axonrift — Web, mobile app, SaaS and MVP development";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const wordmark = await readFile(
    join(process.cwd(), "public/brand/axonrift-wordmark.png"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "0 96px",
          background: "radial-gradient(ellipse at 100% 0%, #c8eef7, #f5f7f8 65%)",
          color: "#0a1015",
        }}
      >
        <img
          src={`data:image/png;base64,${wordmark.toString("base64")}`}
          alt=""
          width={375}
          height={82}
        />
        <div style={{ marginTop: 52, fontSize: 69, fontWeight: 700 }}>
          Web, mobile, SaaS & MVPs
        </div>
        <div style={{ marginTop: 18, fontSize: 34, color: "#315966" }}>
          Software design and development
        </div>
      </div>
    ),
    size,
  );
}
