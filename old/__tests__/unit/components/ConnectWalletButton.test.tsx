import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { ConnectWalletButton } from "../../../components/ConnectWalletButton";
import { useConnect } from "wagmi";
import { metaMask } from "wagmi/connectors";

jest.mock("wagmi", () => {
  useConnect: jest.fn(() => ({
    connectAsync: jest.fn(),
    isLoading: false,
    connect: jest.fn(),
  }));
});

jest.mock("useAccount", () => ({
  addres: "0x123456789abcdef",
  isConnected: true,
}));

jest.mock("useSession", () => ({
  useSession: jest.fn(() => ({
    status: "authenticated",
  })),
}));

describe("Connect Wallet Button", () => {
  it("renders a button to connect with metamask", () => {
    render(<ConnectWalletButton />);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
  });

  it("handles metamask connection", async () => {
    render(<ConnectWalletButton />);

    const button = screen.getByRole("button");

    fireEvent.click(button);
    await waitFor(() => {
      expect(useConnect().connectAsync).toHaveBeenCalledWith({
        connector: metaMask(),
      });
    });
  });
});
