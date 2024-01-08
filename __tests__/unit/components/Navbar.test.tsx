import { render } from "@testing-library/react";
import { Navbar } from "../../../components/Navbar";
describe("App Navbar", () => {
  it("should app header", () => {
    render(<Navbar />);
  });
});
