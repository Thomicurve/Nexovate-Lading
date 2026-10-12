export function serializeJsonLd(data: Record<string, unknown>): string {
  // Prevent translated or future dynamic text from ending the script element.
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export default function StructuredData({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
