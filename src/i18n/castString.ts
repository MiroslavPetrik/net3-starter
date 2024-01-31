export function castString(record: Record<string, unknown>): string {
  return record as unknown as string;
}
