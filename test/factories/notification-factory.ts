import { Content } from "@app/entities/content";
import { Notification, INotificaitonProps } from "@app/entities/notification";

type Override = Partial<INotificaitonProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: "social",
    content: new Content("New Notification"),
    recipientId: "recipient-id-1",
    ...override,
  });
}
