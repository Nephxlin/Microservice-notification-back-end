import { Notification } from "@app/entities/notification";
import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../repository/notification-repository";

interface IGetNotificationRequest {
  recipientId: string;
}

interface GetNotificationResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotification {
  constructor(private notificationsRepository: NotificationRepository) {}

  async execute(
    request: IGetNotificationRequest,
  ): Promise<GetNotificationResponse> {
    const { recipientId } = request;

    const notifications =
      await this.notificationsRepository.findManyByRecipientId(recipientId);

    return {
      notifications,
    };
  }
}
