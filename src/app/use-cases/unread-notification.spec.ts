import { makeNotification } from "../../../test/factories/notification-factory";
import { InMemoryNotificationRepository } from "../../../test/repositories/in-memory-notifications-repository";
import { CancelNotification } from "./cancel-notification";
import { NotificationNotFound } from "./errors/notification-not-found";
import { UnreadNotification } from "./unread-notification";

describe("Unread Notification", () => {
  it("Should be able to Unread a notification", async () => {
    const notificationRepository = new InMemoryNotificationRepository();

    const unreadNotification = new UnreadNotification(notificationRepository);

    const notification = makeNotification({ readAt: new Date() });

    await notificationRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toBeNull();
  });
  it("Should not be able to unread a non exist notification", async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const readNotification = new UnreadNotification(notificationRepository);

    expect(async () => {
      return await readNotification.execute({
        notificationId: "fake-notification-id",
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
