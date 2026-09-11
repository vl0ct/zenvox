"use client";

export function PageEdgeBlur() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-50 h-14"
        style={{
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          maskImage: "linear-gradient(to bottom, grey 0%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, grey 0%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-50 h-14"
        style={{
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, black 0%, transparent 100%)",
        }}
      />
    </>
  );
}
