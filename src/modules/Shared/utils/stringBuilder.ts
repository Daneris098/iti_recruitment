export function stringBuilder<T extends Record<string, any>>(
  data: T,
  parentKey = "",
  result: Record<string, string> = {}
): Record<string, string> {
  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    const fullKey = parentKey ? `${parentKey}.${key}` : key;

    if (
      typeof value === "object" &&
      !(value instanceof Date) &&
      !(value instanceof File) &&
      !Array.isArray(value)
    ) {
      // Recursively flatten nested objects (except Date/File/Array)
      stringBuilder(value, fullKey, result);
    } else if (Array.isArray(value)) {
      // Flatten arrays by indexing keys
      value.forEach((item, idx) => {
        if (typeof item === "object") {
          stringBuilder(item, `${fullKey}[${idx}]`, result);
        } else {
          result[`${fullKey}[${idx}]`] = String(item);
        }
      });
    } else {
      // Primitive or Date/File, convert to string
      result[fullKey] = value instanceof Date ? value.toISOString() : String(value);
    }
  });

  return result;
}