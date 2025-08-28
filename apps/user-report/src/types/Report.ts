export interface Report {
  id: string;
  applicationSlug: string;
  reportUserId: string;
  tag: string[];
  content: string;
  reportedUserId: string;
  createdAt: string;
  status: string;
  processAt: string;
  processReply: string;
  processUsername: string;
}