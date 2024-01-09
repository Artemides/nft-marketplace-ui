import formidable from "formidable";

type ParsedFields<T> = { [K in keyof T]: T[K] };
type ParsedFiles<T> = { [K in keyof T]: formidable.File | undefined };

export function parseFields<T>(
  fields: formidable.Fields<string>
): ParsedFields<T> {
  const metadata: ParsedFields<T> = {} as ParsedFields<T>;
  for (const [key, value] of Object.entries(fields)) {
    if (key === "traits" && value) {
      metadata[key as keyof T] = JSON.parse(value[0]) as T[keyof T];
      continue;
    }
    metadata[key as keyof T] = (value && value[0]) as T[keyof T];
  }

  return metadata;
}

export function parseFiles<T>(files: formidable.Files<string>): ParsedFiles<T> {
  const _files: ParsedFiles<T> = {} as ParsedFiles<T>;
  for (const [key, value] of Object.entries(files)) {
    _files[key as keyof T] = value && value[0];
  }

  return _files;
}
