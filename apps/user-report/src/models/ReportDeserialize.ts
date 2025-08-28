import moment from 'moment';
import { BaseEntity } from '@shared/types';

export class ReportDeserialize extends BaseEntity {
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

  constructor(props: any) {
    super(props);
    this.id = props.report_id;
    this.applicationSlug = props.application_slug;
    // 举报人 ID
    this.reportUserId = props.user_id;
    this.tag = props.tag;
    this.content = props.content;
    // 被举报人 ID
    this.reportedUserId = props.reported_user_id;
    // 举报时间
    this.createdAt = props.created_at ? moment(props.created_at).format('YYYY-MM-DD HH:mm:ss') : '';
    this.status = props.status;
    // 处理举报时间  
    this.processAt = props.process_at ? moment(props.process_at).format('YYYY-MM-DD HH:mm:ss') : '';
    this.processReply = props.process_reply;
    this.processUsername = props.process_username;
  }
}