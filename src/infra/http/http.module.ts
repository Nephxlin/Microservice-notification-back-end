import { CancelNotification } from "@app/use-cases/cancel-notification";
import { CountRecipientNotification } from "@app/use-cases/count-recipient-notification";
import { GetRecipientNotification } from "@app/use-cases/get-recipient-notification";
import { ReadNotification } from "@app/use-cases/read-notification";
import { UnreadNotification } from "@app/use-cases/unread-notification";
import { Module } from "@nestjs/common";
import { SendNotification } from "src/app/use-cases/send-notification";
import { DatabaseModule } from "../database/database.module";
import { NotificationController } from "./controllers/notifications.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotification,
    GetRecipientNotification,
    ReadNotification,
    UnreadNotification,
  ],
})
export class httpModule {}
