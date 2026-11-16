# Prompt Traceability Log - News Blog Performance Tracker
**Ticket ID:** ENG-84718
**Assignee:** Hemant Chauhan [PDIT-INT-1176]
**Workflow:** Test-Driven Development (TDD) via AI

### Step 1: Initial Test Suite Generation (TDD Approach)
**Prompt:**
> "Act as a Senior Frontend SDET. We are building a React component called 'PerformanceTracker' for a News Blog. Before writing the implementation, write a comprehensive test suite using Vitest/Jest and React Testing Library. 
> The tests must verify:
> 1. Happy Path: Component renders, accepts input, and displays structured data.
> 2. Unhappy Path: Shows 'No data found' on empty states.
> 3. Unhappy Path: Shows a loading indicator during async operations.
> 4. Unhappy Path: Validates missing inputs and highlights offending fields in red.
> 5. NFRs: Ensures interactive elements have ARIA labels for 100% Lighthouse accessibility.
> Output ONLY the test file code."

### Step 2: Core Implementation (Happy Path & Memoization)
**Prompt:**
> "Now act as a Senior React Engineer. Write the core implementation for `PerformanceTracker.jsx` to make the previous tests pass. 
> Strict Constraints:
> - Wrap expensive computations in `useMemo` and stabilize functions with `useCallback` to prevent unnecessary re-renders.
> - Use a strict monochromatic corporate design system (shades of gray/black/white). No rogue hex colors.
> - Maintain consistent padding (16px/32px steps) using standard CSS or Tailwind.
> Keep the code modular and clean."

### Step 3: Edge Cases & Telemetry (Unhappy Path & NFRs)
**Prompt:**
> "Refine the component to handle the specific Non-Functional Requirements (NFRs) and edge cases required by the TRD:
> 1. Add a simulated analytics ping. Log exactly `[Analytics] User interacted with Performance Optimization` to the console when a primary action (like form submission or search) is completed.
> 2. Ensure the form prevents submission on invalid data and applies a red border (`border-red-500`) to invalid fields.
> 3. Implement XSS sanitization. Use a utility function (or a library like DOMPurify) to sanitize all text inputs before storing them in React state.
> 4. Ensure the slow 3G connectivity simulation works by wrapping the fetch/submit logic in a deliberate `setTimeout` (e.g., 800ms) that sets a `isLoading` state to true."

### Step 4: Iterative Bug Fix (Handling AI Hallucinations)
**Prompt:**
> "That approach caused an error with the form submission re-rendering the entire list unnecessarily. Let's revert the state management for the list. Instead of keeping the list in the same state object as the form inputs, separate them into two different `useState` hooks and use `useMemo` for the list mapping. Also, double-check that the XSS sanitization runs *before* the state update."
