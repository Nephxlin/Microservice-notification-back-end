import { makeNotification } from "../../../test/factories/notification-factory";
import { InMemoryNotificationRepository } from "../../../test/repositories/in-memory-notifications-repository";
import { CancelNotification } from "./cancel-notification";
import { NotificationNotFound } from "./errors/notification-not-found";
import { ReadNotification } from "./read-notification";

describe("Read  Notification", () => {
  it("Should be able to Read a notification", async () => {
    const notificationRepository = new InMemoryNotificationRepository();

    const readNotification = new ReadNotification(notificationRepository);

    const notification = makeNotification();

    await notificationRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });
  it("Should not be able to read a non exist notification", async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const readNotification = new CancelNotification(notificationRepository);

    expect(async () => {
      return await readNotification.execute({
        notificationId: "fake-notification-id",
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
