import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App.jsx";

describe("News Blog Performance Tracker Acceptance Tests", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("renders main landmarks, heading, and summary stats", () => {
    render(<App />);

    // Header and main semantic landmarks
    expect(
      screen.getByRole("heading", {
        name: /News Blog Editorial & Operational Performance Tracker/i,
        level: 1,
      })
    ).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();

    // Summary statistics cards
    expect(screen.getByText(/Total Records/i)).toBeInTheDocument();
    expect(screen.getByText(/Optimized Records/i)).toBeInTheDocument();
    expect(screen.getByText(/Average Turnaround/i)).toBeInTheDocument();

    // Accessible form labels
    expect(screen.getByLabelText(/Article Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Turnaround Time \(Hours\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Optimization Status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Optimization Notes/i)).toBeInTheDocument();

    // Submit button
    expect(
      screen.getByRole("button", { name: /Save Record/i })
    ).toBeInTheDocument();
  });

  it("filters records by search query and status", async () => {
    const user = userEvent.setup();
    render(<App />);

    // Search input
    const searchInput = screen.getByLabelText(/Search Records/i);
    await user.type(searchInput, "Election");

    // Expect matching record to remain visible and non-matching to be excluded
    expect(screen.getByText(/Election Night Live Coverage/i)).toBeInTheDocument();
    expect(screen.queryByText(/Tech Gadgets Fall Review/i)).not.toBeInTheDocument();

    // Clear search and filter by status
    await user.clear(searchInput);
    const statusFilter = screen.getByLabelText(/Filter by Status/i);
    await user.selectOptions(statusFilter, "Optimized");

    // Only optimized records displayed
    const statusBadges = screen.getAllByTestId("record-status-badge");
    statusBadges.forEach((badge) => {
      expect(badge).toHaveTextContent(/Optimized/i);
    });
  });

  it("displays an accessible empty state and allows resetting filters", async () => {
    const user = userEvent.setup();
    render(<App />);

    const searchInput = screen.getByLabelText(/Search Records/i);
    await user.type(searchInput, "NonExistentArticleKeyword12345");

    // Meaningful empty state
    expect(
      screen.getByText(/No performance records found/i)
    ).toBeInTheDocument();

    // Clear search button in empty state
    const clearButton = screen.getByRole("button", { name: /Clear Filters/i });
    expect(clearButton).toBeInTheDocument();

    await user.click(clearButton);
    expect(searchInput).toHaveValue("");
    expect(
      screen.queryByText(/No performance records found/i)
    ).not.toBeInTheDocument();
  });

  it("validates required fields, highlights invalid inputs, and blocks submission", async () => {
    const user = userEvent.setup();
    const consoleSpy = vi.spyOn(console, "log");
    render(<App />);

    const submitBtn = screen.getByRole("button", { name: /Save Record/i });
    await user.click(submitBtn);

    // Inputs marked invalid with aria-invalid="true"
    const titleInput = screen.getByLabelText(/Article Title/i);
    const turnaroundInput = screen.getByLabelText(/Turnaround Time \(Hours\)/i);
    const notesInput = screen.getByLabelText(/Optimization Notes/i);

    expect(titleInput).toHaveAttribute("aria-invalid", "true");
    expect(turnaroundInput).toHaveAttribute("aria-invalid", "true");
    expect(notesInput).toHaveAttribute("aria-invalid", "true");

    // Inline error messages linked via aria-describedby
    expect(screen.getByText(/Article title is required/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Turnaround time must be a positive number/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Optimization notes are required/i)
    ).toBeInTheDocument();

    // Telemetry MUST NOT be logged on invalid submission
    expect(consoleSpy).not.toHaveBeenCalledWith(
      "[Analytics] User interacted with Performance Optimization"
    );
  });

  it("validates minimum length and positive turnaround time", async () => {
    const user = userEvent.setup();
    render(<App />);

    const titleInput = screen.getByLabelText(/Article Title/i);
    const turnaroundInput = screen.getByLabelText(/Turnaround Time \(Hours\)/i);
    const notesInput = screen.getByLabelText(/Optimization Notes/i);
    const submitBtn = screen.getByRole("button", { name: /Save Record/i });

    await user.type(titleInput, "AB"); // Less than 3 chars
    await user.type(turnaroundInput, "-5"); // Negative number
    await user.type(notesInput, "Tiny"); // Less than 5 chars
    await user.click(submitBtn);

    expect(
      screen.getByText(/Article title must be at least 3 characters/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Turnaround time must be greater than 0/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Notes must be at least 5 characters/i)
    ).toBeInTheDocument();
  });

  it("sanitizes text inputs by stripping unsafe HTML and script tags before storing in state", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(
      screen.getByLabelText(/Article Title/i),
      "<script>alert('xss')</script>AI Breakthrough in Journalism"
    );
    await user.selectOptions(screen.getByLabelText(/Category/i), "Technology");
    await user.type(
      screen.getByLabelText(/Turnaround Time \(Hours\)/i),
      "4"
    );
    await user.selectOptions(
      screen.getByLabelText(/Optimization Status/i),
      "Optimized"
    );
    await user.type(
      screen.getByLabelText(/Optimization Notes/i),
      "<b>Batch compiled</b><img src=x onerror=alert(1)> and verified."
    );

    const submitBtn = screen.getByRole("button", { name: /Save Record/i });
    await user.click(submitBtn);

    // Await completion
    await waitFor(() => {
      expect(
        screen.getByText(/AI Breakthrough in Journalism/i)
      ).toBeInTheDocument();
    });

    // Ensure raw malicious script tags are not rendered or present
    expect(document.querySelector("script")).toBeNull();
    expect(screen.queryByText(/<script>/i)).not.toBeInTheDocument();
    expect(
      screen.getByText(/Batch compiled and verified\./i)
    ).toBeInTheDocument();
  });

  it("persists records to localStorage and restores them on load", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);

    await user.type(
      screen.getByLabelText(/Article Title/i),
      "Exclusive Interview with Tech CEO"
    );
    await user.selectOptions(screen.getByLabelText(/Category/i), "Business");
    await user.type(screen.getByLabelText(/Turnaround Time \(Hours\)/i), "6");
    await user.selectOptions(
      screen.getByLabelText(/Optimization Status/i),
      "Optimized"
    );
    await user.type(
      screen.getByLabelText(/Optimization Notes/i),
      "Reduced editorial iterations by 40%."
    );

    await user.click(screen.getByRole("button", { name: /Save Record/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Exclusive Interview with Tech CEO/i)
      ).toBeInTheDocument();
    });

    // Verify localStorage has persisted data
    const saved = localStorage.getItem("news_blog_performance_records");
    expect(saved).toBeTruthy();
    expect(saved).toContain("Exclusive Interview with Tech CEO");

    // Unmount and remount to verify restoration
    unmount();
    render(<App />);

    expect(
      screen.getByText(/Exclusive Interview with Tech CEO/i)
    ).toBeInTheDocument();
  });

  it("displays loading indicator and disables submit button during async save", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(
      screen.getByLabelText(/Article Title/i),
      "Climate Summit Policy Recap"
    );
    await user.selectOptions(screen.getByLabelText(/Category/i), "Science");
    await user.type(screen.getByLabelText(/Turnaround Time \(Hours\)/i), "3");
    await user.selectOptions(
      screen.getByLabelText(/Optimization Status/i),
      "In Progress"
    );
    await user.type(
      screen.getByLabelText(/Optimization Notes/i),
      "Automated factual verification pipeline."
    );

    const submitBtn = screen.getByRole("button", { name: /Save Record/i });
    await user.click(submitBtn);

    // While saving: button is disabled and shows loading indicator
    expect(submitBtn).toBeDisabled();
    expect(submitBtn).toHaveAttribute("aria-busy", "true");
    expect(screen.getByText(/Saving\.\.\./i)).toBeInTheDocument();

    // After resolution: button returns to normal
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /Save Record/i })
      ).toBeEnabled();
    });
  });

  it("handles interrupted network gracefully, preserves form inputs, and allows retry", async () => {
    const user = userEvent.setup();
    render(<App />);

    const titleInput = screen.getByLabelText(/Article Title/i);
    const turnaroundInput = screen.getByLabelText(/Turnaround Time \(Hours\)/i);
    const notesInput = screen.getByLabelText(/Optimization Notes/i);
    const disruptionCheckbox = screen.getByLabelText(
      /Simulate Network Disruption/i
    );

    await user.type(titleInput, "Weekend Sports Highlights");
    await user.selectOptions(screen.getByLabelText(/Category/i), "Culture");
    await user.type(turnaroundInput, "5");
    await user.selectOptions(
      screen.getByLabelText(/Optimization Status/i),
      "Pending"
    );
    await user.type(notesInput, "Pending photo gallery compression.");

    // Turn on simulated network disruption
    await user.click(disruptionCheckbox);

    await user.click(screen.getByRole("button", { name: /Save Record/i }));

    // Expect accessible error alert
    const errorAlert = await screen.findByRole("alert");
    expect(errorAlert).toHaveTextContent(
      /Network request interrupted\. Please check your connection and retry\./i
    );

    // Form inputs MUST be preserved
    expect(titleInput).toHaveValue("Weekend Sports Highlights");
    expect(turnaroundInput).toHaveValue(5);
    expect(notesInput).toHaveValue("Pending photo gallery compression.");

    // Retry button available
    const retryBtn = screen.getByRole("button", { name: /Retry/i });
    expect(retryBtn).toBeInTheDocument();

    // Turn off disruption and retry
    await user.click(disruptionCheckbox);
    await user.click(retryBtn);

    // Upon retry success, alert is removed and record is added
    await waitFor(() => {
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
      expect(
        screen.getByText(/Weekend Sports Highlights/i)
      ).toBeInTheDocument();
    });
  });

  it("logs exact telemetry upon successful primary user action", async () => {
    const user = userEvent.setup();
    const consoleSpy = vi.spyOn(console, "log");
    render(<App />);

    await user.type(
      screen.getByLabelText(/Article Title/i),
      "Fiscal Q4 Corporate Earnings Overview"
    );
    await user.selectOptions(screen.getByLabelText(/Category/i), "Business");
    await user.type(screen.getByLabelText(/Turnaround Time \(Hours\)/i), "8");
    await user.selectOptions(
      screen.getByLabelText(/Optimization Status/i),
      "Optimized"
    );
    await user.type(
      screen.getByLabelText(/Optimization Notes/i),
      "Streamlined table formatting and automated charts."
    );

    await user.click(screen.getByRole("button", { name: /Save Record/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Fiscal Q4 Corporate Earnings Overview/i)
      ).toBeInTheDocument();
    });

    // Mandatory Telemetry Verification
    expect(consoleSpy).toHaveBeenCalledWith(
      "[Analytics] User interacted with Performance Optimization"
    );
  });

  it("supports keyboard navigation and accessible focus", async () => {
    const user = userEvent.setup();
    render(<App />);

    const searchInput = screen.getByLabelText(/Search Records/i);
    const filterSelect = screen.getByLabelText(/Filter by Status/i);
    const titleInput = screen.getByLabelText(/Article Title/i);

    // User tabs through controls
    searchInput.focus();
    expect(document.activeElement).toBe(searchInput);

    await user.tab();
    expect(document.activeElement).toBe(filterSelect);

    await user.tab();
    // Reaches form inputs sequentially
    expect(document.activeElement).toBe(titleInput);
  });
});
