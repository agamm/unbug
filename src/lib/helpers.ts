export function getLang(filename: string, language: string) {
  if (filename.endsWith("py")) return "python";

  if (filename.endsWith("js")) return "javascript";

  if (filename.endsWith("ts")) return "typescript";

  return language.toLowerCase() ?? "";
}
