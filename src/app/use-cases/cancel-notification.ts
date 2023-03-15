import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../repository/notification-repository";
import { NotificationNotFound } from "./errors/notification-not-found";

interface ICancelNotificaionRequest {
  notificationId: string;
}

type CancelNotificaionResponse = void;

@Injectable()
export class CancelNotification {
  constructor(private notificationsRepository: NotificationRepository) {}

  async execute(
    request: ICancelNotificaionRequest,
  ): Promise<CancelNotificaionResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}
