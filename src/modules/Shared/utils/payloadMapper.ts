export function payloadMapper<T extends Record<string, any>>(
  data: T,
  formData = new FormData(),
  parentKey = "",
  keyMap: Record<string, string> = {}
): FormData {
  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    const rawKey = parentKey ? `${parentKey}.${key}` : key;
    const formKey = keyMap[rawKey] || rawKey;

    if (typeof value === "object" && !(value instanceof File)) {
      payloadMapper(value, formData, rawKey, keyMap);
    } else {
      formData.append(formKey, value instanceof File ? value : value.toString());
    }
  });

  return formData;
}
