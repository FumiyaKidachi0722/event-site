type FirestoreValue =
  | { stringValue: string }
  | { integerValue: string }
  | { doubleValue: number }
  | { booleanValue: boolean }
  | { nullValue: null }
  | { mapValue: { fields: Record<string, FirestoreValue> } }
  | { arrayValue: { values: FirestoreValue[] } };

export function toFirestoreValue(value: unknown): FirestoreValue {
  if (value === null || value === undefined) {
    return { nullValue: null };
  }

  if (typeof value === "string") {
    return { stringValue: value };
  }

  if (typeof value === "boolean") {
    return { booleanValue: value };
  }

  if (typeof value === "number") {
    if (Number.isInteger(value)) {
      return { integerValue: String(value) };
    }

    return { doubleValue: value };
  }

  if (Array.isArray(value)) {
    return {
      arrayValue: {
        values: value.map((item) => toFirestoreValue(item)),
      },
    };
  }

  if (typeof value === "object") {
    return {
      mapValue: {
        fields: Object.fromEntries(
          Object.entries(value as Record<string, unknown>).map(([key, item]) => [
            key,
            toFirestoreValue(item),
          ]),
        ),
      },
    };
  }

  return { stringValue: String(value) };
}

export function fromFirestoreValue(value: FirestoreValue): unknown {
  if ("stringValue" in value) {
    return value.stringValue;
  }

  if ("booleanValue" in value) {
    return value.booleanValue;
  }

  if ("integerValue" in value) {
    return Number(value.integerValue);
  }

  if ("doubleValue" in value) {
    return value.doubleValue;
  }

  if ("nullValue" in value) {
    return null;
  }

  if ("arrayValue" in value) {
    return (value.arrayValue.values ?? []).map((item) => fromFirestoreValue(item));
  }

  return Object.fromEntries(
    Object.entries(value.mapValue.fields ?? {}).map(([key, item]) => [
      key,
      fromFirestoreValue(item),
    ]),
  );
}

export function fromFirestoreDocument<T>(document: {
  name: string;
  fields?: Record<string, FirestoreValue>;
}) {
  const id = document.name.split("/").pop() ?? "";
  const fields = Object.fromEntries(
    Object.entries(document.fields ?? {}).map(([key, value]) => [key, fromFirestoreValue(value)]),
  );
  return { id, ...fields } as T;
}

export function toFirestoreDocument<T extends Record<string, unknown>>(input: T) {
  return {
    fields: Object.fromEntries(
      Object.entries(input).map(([key, value]) => [key, toFirestoreValue(value)]),
    ),
  };
}
