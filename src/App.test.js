import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("showing header", () => {
    render(<App />);
    screen.debug();
    expect(screen.getByText("Employees")).toBeInTheDocument();
    expect(screen.getByText(/Employees Birthday/i)).toBeInTheDocument();
  });
});
