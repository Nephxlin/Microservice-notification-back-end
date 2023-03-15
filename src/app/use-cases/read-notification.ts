import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../repository/notification-repository";
import { NotificationNotFound } from "./errors/notification-not-found";

interface ReadNotificaionRequest {
  notificationId: string;
}

type ReadlNotificationResponse = void;

@Injectable()
export class ReadNotification {
  constructor(private notificationsRepository: NotificationRepository) {}

  async execute(
    request: ReadNotificaionRequest,
  ): Promise<ReadlNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.read();

    await this.notificationsRepository.save(notification);
  }
}
