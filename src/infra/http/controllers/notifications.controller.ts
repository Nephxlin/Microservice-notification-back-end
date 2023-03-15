import { CancelNotification } from "@app/use-cases/cancel-notification";
import { CountRecipientNotification } from "@app/use-cases/count-recipient-notification";
import { GetRecipientNotification } from "@app/use-cases/get-recipient-notification";
import { ReadNotification } from "@app/use-cases/read-notification";
import { UnreadNotification } from "@app/use-cases/unread-notification";
import { Body, Controller, Get, Param, Post, Patch } from "@nestjs/common";
import { SendNotification } from "src/app/use-cases/send-notification";

import { CreateNotificationBody } from "../dtos/create-notification-body";
import { NotificationViewModel } from "../view-models/notification-view-model";

@Controller("notifications")
export class NotificationController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotificaition: ReadNotification,
    private unreadNotificaition: UnreadNotification,
    private countRecipientNotifications: CountRecipientNotification,
    private getRecipientNotifications: GetRecipientNotification,
  ) {}

  @Patch(":id/cancel")
  async cancel(@Param("id") id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Get("count/from/:recipientId")
  async countFromRecipient(
    @Param("recipientId") recipientId: string,
  ): Promise<{ count: number }> {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return {
      count,
    };
  }

  @Get("count/from/:recipientId")
  async getFromRecipient(@Param("recipientId") recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHTTP),
    };
  }
  @Patch(":id/read")
  async read(@Param("id") id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }
  @Patch(":id/undread")
  async undread(@Param("id") id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = await body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      category,
      content,
    });

    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }
}
