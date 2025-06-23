import { Resend } from "resend";
import { sendEmail } from "../../../src/lib/send-email";
import * as React from "react";
import { render } from "@react-email/components";

// Mock environment variables
jest.mock("../../../src/common/constant/email", () => ({
  RESEND_API_KEY: "test-api-key",
  EMAIL_FROM: "test@example.com",
}));

// Mock react-email
jest.mock("@react-email/components", () => ({
  render: jest.fn(),
}));

// Mock React.createElement
jest.mock("react", () => {
  const originalReact = jest.requireActual("react");
  return {
    ...originalReact,
    createElement: jest.fn(),
  };
});

// Mock the Resend module
const mockSend = jest.fn();
jest.mock("resend", () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: mockSend,
    },
  })),
}));

describe("sendEmail", () => {
  const mockTo = "test@example.com";
  const mockSubject = "Test Subject";
  const mockHtml = "<p>Test HTML</p>";
  const mockData = { id: "123" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call Resend with correct parameters", async () => {
    // Arrange
    mockSend.mockResolvedValue({ data: mockData });

    // Act
    await sendEmail(mockTo, mockSubject, mockHtml);

    // Assert
    expect(Resend).toHaveBeenCalledWith("test-api-key");
    expect(mockSend).toHaveBeenCalledWith({
      from: "test@example.com",
      to: mockTo,
      subject: mockSubject,
      html: mockHtml,
    });
  });

  it("should throw error when Resend returns error", async () => {
    // Arrange
    const mockError = {
      name: "ResendError",
      message: "Failed to send email",
    };
    mockSend.mockResolvedValue({ error: mockError });

    // Act & Assert
    await expect(sendEmail(mockTo, mockSubject, mockHtml)).rejects.toThrow(
      `${mockError.name} - ${mockError.message}`
    );
  });

  it("should throw error when no data is returned", async () => {
    // Arrange
    mockSend.mockResolvedValue({});

    // Act & Assert
    await expect(sendEmail(mockTo, mockSubject, mockHtml)).rejects.toThrow(
      "Email not sent"
    );
  });
});
