import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Card from "./Card";

describe("Card Component", () => {
  test("renders Card", () => {
    render(
      <Card>
        <div>
          <h3>Card heading</h3>
          <p>Card detail </p>
        </div>
      </Card>
    );

    const heading = screen.getByRole("heading", { level: 3 });
    const description = screen.getByRole("paragraph");

    expect(description).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });
});
