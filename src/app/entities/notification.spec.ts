import { Content } from "./content";
import { Notification } from "./notification";

describe("Notificaiton Content", () => {
  it("should be able to create a notification", () => {
    const notification = new Notification({
      category: "social",
      content: new Content("New updade alert"),
      recipientId: "example-recipient-id",
      createdAt: new Date(),
    });

    expect(notification).toBeTruthy();
  });
});
