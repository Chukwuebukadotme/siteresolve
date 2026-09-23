import { NextResponse } from 'next/server';
import { handleSubmission, isFormKind } from '@/lib/submissions';

const MAX_BYTES = 20_000;

export async function POST(request: Request, { params }: { params: Promise<{ kind: string }> }) {
  const { kind } = await params;
  if (!isFormKind(kind)) return NextResponse.json({ error: 'not_found' }, { status: 404 });

  const text = await request.text();
  if (text.length > MAX_BYTES) return NextResponse.json({ error: 'too_large' }, { status: 413 });

  let input: unknown;
  try {
    input = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }
  if (!input || typeof input !== 'object' || Array.isArray(input)) return NextResponse.json({ error: 'invalid_body' }, { status: 400 });

  const result = await handleSubmission(kind, input as Record<string, unknown>);
  return NextResponse.json(result.body, { status: result.status });
}
