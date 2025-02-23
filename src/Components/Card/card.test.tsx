import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Card from "./Card";

describe("Card Component", () => {
  test("renders Card", () => {
    render(
      <Card>
        <h3>a card</h3>
      </Card>
    );

    const heading = screen.getByRole("heading", { level: 3 });

    expect(heading).toBeInTheDocument();
  });
});
