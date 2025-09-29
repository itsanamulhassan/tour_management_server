export interface FileProps {
  url: string;
  public_id: string;
}

export type ChildFolderProps =
  | "avatars"
  | "divisions"
  | "tour_thumbnails"
  | "guide_nid"
  | "booking_invoices";
