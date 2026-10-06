import Image from "next/image"

type BrandLogoProps = {
  placement?: "navbar" | "footer"
}

export default function BrandLogo({ placement = "navbar" }: BrandLogoProps) {
  return (
    <span
      className={`relative block shrink-0 overflow-hidden aspect-[170/32] ${
        placement === "navbar"
          ? "w-[150px] md:w-[170px]"
          : "w-[190px] md:w-[210px]"
      }`}
    >
      {/* Frame the original 2172×724 PNG at (129, 181), 1924×362.
          One uniform scale preserves the approved wordmark and symbol. */}
      <Image
        src="/images/brand/nexovate-logo.png"
        alt="Nexovate"
        width={2172}
        height={724}
        unoptimized
        priority={placement === "navbar"}
        className="absolute max-w-none"
        style={{
          width: `${(2172 / 1924) * 100}%`,
          height: "auto",
          left: `${(-129 / 1924) * 100}%`,
          top: "-50%",
        }}
      />
    </span>
  )
}
