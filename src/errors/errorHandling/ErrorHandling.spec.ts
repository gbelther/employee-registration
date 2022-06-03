import { faker } from "@faker-js/faker";
import { ErrorHandling } from ".";
import { AppError } from "../appError";

describe("ErrorHandling", () => {
  it("should be able to handle the error", () => {
    const message = faker.random.words();
    const errorHandling = new ErrorHandling(new Error(message));
    expect(errorHandling.error).toEqual({
      message,
      statusCode: 400,
    });
  });

  it("should be able to handle the AppError", () => {
    const message = faker.random.words();
    const statusCode = Number(faker.random.numeric(3));
    const errorHandling = new ErrorHandling(new AppError(message, statusCode));
    expect(errorHandling.error).toEqual({
      message,
      statusCode,
    });
  });
});
