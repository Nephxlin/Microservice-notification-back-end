import { Content } from "./content";

describe("Notificaiton Content", () => {
  it("should be able to create a notification content", () => {
    const content = new Content("valid notification");

    expect(content).toBeTruthy();
  });

  it("should be not able to create a notification content with less than 5 characters", () => {
    expect(() => new Content("val")).toThrow();
  });

  it("should be not able to create a notification content with more than 5 characters", () => {
    expect(() => new Content("val")).toThrow();
  });
});
