import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../repository/notification-repository";

interface ICountNotificationRequest {
  recipientId: string;
}

interface CountNotificationResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotification {
  constructor(private notificationsRepository: NotificationRepository) {}

  async execute(
    request: ICountNotificationRequest,
  ): Promise<CountNotificationResponse> {
    const { recipientId } = request;

    const count = await this.notificationsRepository.countManyByRecipientId(
      recipientId,
    );

    return {
      count,
    };
  }
}
