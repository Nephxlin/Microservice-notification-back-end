import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../repository/notification-repository";
import { NotificationNotFound } from "./errors/notification-not-found";

interface UnreadNotificaionRequest {
  notificationId: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {
  constructor(private notificationsRepository: NotificationRepository) {}

  async execute(
    request: UnreadNotificaionRequest,
  ): Promise<UnreadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.unread();

    await this.notificationsRepository.save(notification);
  }
}
