import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Drawer from "./Drawer";

describe("Drawer Component", () => {
  test("renders Drawer with content off screen", () => {
    render(
      <Drawer visible={false} closeDrawer={() => {}}>
        <h1>panel</h1>
      </Drawer>
    );

    const drawer = screen.getByRole("complementary");
    expect(screen.getByText("panel")).toBeInTheDocument();
    expect(drawer.className).toContain("hide");
    expect(drawer.className).not.toContain("show");
  });

  test("renders Drawer on screen", () => {
    render(
      <Drawer visible={true} closeDrawer={() => {}}>
        <h1>panel</h1>
      </Drawer>
    );

    const drawer = screen.getByRole("complementary");
    expect(drawer.className).toContain("show");
    expect(drawer.className).not.toContain("hide");
  });
});
