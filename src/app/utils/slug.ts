export interface SlugOptions {
  prefix?: string;
  suffix?: string;
  separator?: "-" | "_";
}

export const generateSlug = (text: string, options?: SlugOptions): string => {
  const separator = options?.separator || "_";
  const prefix = options?.prefix ? options.prefix + separator : "";
  const suffix = options?.suffix ? separator + options.suffix : "";

  const slugify = text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, separator)
    .replace(/[^a-z0-9_-]/g, "");

  return `${prefix}${slugify}${suffix}`;
};
