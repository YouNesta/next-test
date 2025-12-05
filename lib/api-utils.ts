import { NextResponse } from "next/server";

type ActionResult<T = unknown> = 
  | ({ success: boolean } & ({ data: T } | { data?: T } | {}))
  | { error: string };

export function handleApiResult<T = unknown>(
  result: ActionResult<T>,
  successStatus: number = 200
): NextResponse {
  if ("error" in result) {
    const status = successStatus === 201 ? 400 : 500;
    return NextResponse.json({ error: result.error }, { status });
  }
  const data = "data" in result ? result.data : undefined;
  return NextResponse.json(data ?? [], { status: successStatus });
}

export function handleApiError(
  error: unknown,
  operation: string,
  defaultMessage: string
): NextResponse {
  console.error(`Error ${operation}:`, error);
  return NextResponse.json({ error: defaultMessage }, { status: 500 });
}

