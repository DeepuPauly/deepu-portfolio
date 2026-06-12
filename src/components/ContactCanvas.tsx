"use client";

import dynamic from "next/dynamic";

const ContactRings = dynamic(() => import("./ContactRings"), {
  ssr: false,
  loading: () => null,
});

export default function ContactCanvas() {
  return (
    <div className="contact-canvas" aria-hidden="true">
      <ContactRings />
    </div>
  );
}
