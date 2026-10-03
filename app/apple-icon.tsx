import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Home-screen icon for iOS, matching app/icon.svg.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #27272a, #09090b)",
          color: "#ffffff",
          fontSize: 68,
          fontWeight: 800,
          letterSpacing: -3,
        }}
      >
        FAC
        <div
          style={{
            width: 78,
            height: 10,
            marginTop: 6,
            borderRadius: 5,
            background: "#ef4444",
          }}
        />
      </div>
    ),
    size,
  );
}
