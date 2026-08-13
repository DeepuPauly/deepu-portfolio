import { ImageResponse } from "next/og";
import { SITE, HERO } from "@/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0b0a09",
          color: "#f2ede4",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#ff6b35",
            marginBottom: 28,
          }}
        >
          {HERO.kicker}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 64,
            lineHeight: 1.15,
            maxWidth: 980,
          }}
        >
          <span>Building the backbone</span>
          <span>of the real products.</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#7a7468",
            marginTop: 36,
          }}
        >
          {SITE.name} · {SITE.role}
        </div>
      </div>
    ),
    { ...size }
  );
}
