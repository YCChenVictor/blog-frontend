import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Dashboard from "../src/components/Dashboard";

describe("Dashboard", () => {
  const articles = [{ url: "test1.md", content: "http://localhost/test1.md" }];
  it("renders without crashing", () => {
    const { getByText } = render(
      <Dashboard articles={articles} category="software" serverOn={true} />,
    );
    expect(getByText("Draw Again")).toBeInTheDocument(); // use Draw Again to check whether the graph is rendered
  });
});
