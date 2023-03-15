import { makeNotification } from "../../../test/factories/notification-factory";
import { InMemoryNotificationRepository } from "../../../test/repositories/in-memory-notifications-repository";
import { GetRecipientNotification } from "./get-recipient-notification";

describe("Get recipients Notification", () => {
  it("Should be able to get recipient notification", async () => {
    const notificationRepository = new InMemoryNotificationRepository();

    const getRecipientNotifications = new GetRecipientNotification(
      notificationRepository,
    );

    await notificationRepository.create(
      makeNotification({ recipientId: "recipient-id-1" }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: "recipient-id-1" }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: "recipient-id-2" }),
    );

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: "recipient-id-1",
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: "recipient-id-1" }),
        expect.objectContaining({ recipientId: "recipient-id-1" }),
      ]),
    );
  });
});
