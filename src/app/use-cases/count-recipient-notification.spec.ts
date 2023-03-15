import { makeNotification } from "../../../test/factories/notification-factory";
import { InMemoryNotificationRepository } from "../../../test/repositories/in-memory-notifications-repository";
import { CountRecipientNotification } from "./count-recipient-notification";

describe("Count recipients Notification", () => {
  it("Should be able to count recipient notification", async () => {
    const notificationRepository = new InMemoryNotificationRepository();

    const countRecipientNotifications = new CountRecipientNotification(
      notificationRepository,
    );

    notificationRepository.create(
      makeNotification({ recipientId: "recipient-id-1" }),
    );

    notificationRepository.create(
      makeNotification({ recipientId: "recipient-id-1" }),
    );
    notificationRepository.create(
      makeNotification({ recipientId: "recipient-id-2" }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: "recipient-id-1",
    });

    expect(count).toEqual(2);
  });
});
