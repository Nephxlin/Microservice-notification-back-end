import { Injectable } from "@nestjs/common";
import { Content } from "../entities/content";
import { Notification } from "../entities/notification";
import { NotificationRepository } from "../repository/notification-repository";

interface ISendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface ISendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(private notificationsRepository: NotificationRepository) {}

  async execute(
    request: ISendNotificationRequest,
  ): Promise<ISendNotificationResponse> {
    const { category, recipientId, content } = request;

    const notification = new Notification({
      category,
      recipientId,
      content: new Content(content),
    });

    // Persist data in Database
    await this.notificationsRepository.create(notification);

    return {
      notification,
    };
  }
}
