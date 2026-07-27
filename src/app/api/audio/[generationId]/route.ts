import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { getSignedAudioUrl } from "@/lib/r2";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ generationId: string }> },
) {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { generationId } = await params;

  const generation = await prisma.generation.findUnique({
    where: { id: generationId, orgId },
  });

  if (!generation) {
    return new Response("Not found", { status: 404 });
  }

  if (!generation.r2ObjectKey) {
    return new Response("Audio is not available yet", { status: 409 });
  }

  const signedUrl = await getSignedAudioUrl(generation.r2ObjectKey);
  const audioResponse = await fetch(signedUrl);

  if (!audioResponse.ok) {
    return new Response("Failed to fetch audio", { status: 502 });
  }

  // Buffer the full response instead of streaming it.
  //
  // Why: Next.js re-encodes a streamed body as chunked transfer, which drops
  // the Content-Length header. Without Content-Length, WaveSurfer cannot
  // determine the audio duration from the stream and falls back to reading
  // the RIFF chunk-size field in the WAV header – which TTS servers commonly
  // set to 0xFFFFFFFF as a placeholder, producing a false ~30-min duration.
  //
  // Buffering guarantees:
  //   1. Content-Length is always present and accurate.
  //   2. The response is not chunked-encoded, so Accept-Ranges/range requests
  //      can work correctly when the browser needs partial content.
  const buffer = await audioResponse.arrayBuffer();

  return new Response(buffer, {
    headers: {
      "Content-Type": "audio/wav",
      "Content-Length": String(buffer.byteLength),
      "Accept-Ranges": "bytes",
      "Cache-Control": "private, max-age=3600",
    },
  });
}
