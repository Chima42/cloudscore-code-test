import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Pill from "./Pill";

describe("Pill Component", () => {
  test("renders Pill", () => {
    render(<Pill label="Pill" type="impact" />);

    expect(screen.getByText("Pill")).toBeInTheDocument();
  });

  test("renders Pill with correct label", () => {
    render(<Pill label="Pill" type="track" onTrack={false} />);

    const offTrackPill = screen.getByText("off track");

    expect(offTrackPill).toBeInTheDocument();
    expect(offTrackPill.className).toContain("offTrack");

    render(<Pill label="Pill" type="track" onTrack={true} />);

    const onTrackPill = screen.getByText("on track");

    expect(onTrackPill).toBeInTheDocument();
    expect(onTrackPill.className).toContain("onTrack");
  });
});
