export type MergeDocument<T> = Document & T;

export interface FileSchemaProps {
  url: string;
  public_id: string;
}

export type ChildFolderProps =
  | "avatars"
  | "divisions"
  | "tour_thumbnails"
  | "guide_nid";
