// types/admin/contact.ts

export type ContactMessageStatus = "NEW" | "IN_PROGRESS" | "DONE" | "ARCHIVED";

export interface ContactMessage {
  id: number;
  fullName: string;
  phoneNumber: string;
  subject: string;
  message: string;
  status: ContactMessageStatus;
  adminNotes: string | null;
  read: boolean;
  handledBy: number | null;
  handledAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessageStats {
  totalMessages: number;
  newMessages: number;
  inProgressMessages: number;
  doneMessages: number;
  archivedMessages: number;
  unreadMessages: number;
  todayMessages: number;
  weekMessages: number;
  monthMessages: number;
}

export interface ContactMessageRequest {
  fullName: string;
  phoneNumber: string;
  subject: string;
  message: string;
}

export interface UpdateContactMessageRequest {
  status: ContactMessageStatus;
  adminNotes?: string;
}
