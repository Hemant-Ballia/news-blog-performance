# Prompts History - Deliverable ENG-84718: Performance Optimization for News Blog

This document records the exact prompts provided by the client/user in chronological order throughout the development lifecycle of this project.

---

## Prompt 1: Initial Project Inspection & Requirement Analysis (Phases 1 & 2)

```text
We are working on Prodesk IT mandatory client deliverable ENG-84718: Performance Optimization for News Blog.

You are acting as a practical frontend engineer working on an existing junior developer's project. Your job is to follow the provided requirements exactly and produce simple, maintainable, working code.

PROJECT LOCATION:
D:\Prodesk-IT_Intern\news-blog-performance

GITHUB:
https://github.com/Hemant-Ballia/news-blog-performance

TECH STACK ALREADY INSTALLED:
- React
- Vite
- Tailwind CSS v4
- JavaScript
- ESLint
- Vitest
- React Testing Library

IMPORTANT DEVELOPMENT RULES:

1. Write straightforward JavaScript and React code.
2. Keep components small and understandable.
3. Use meaningful, simple variable and function names.
4. Avoid unnecessary abstractions, custom hooks, excessive component splitting and complex architecture.
5. Do not add unnecessary dependencies.
6. Do not generate unnecessary folders or files.
7. Do not add features that are not requested.
8. Do not use generic AI-generated looking comments, placeholder code or artificial documentation.
9. Do not use unnecessary animations, gradients, decorative effects or excessive shadows.
10. Use the existing Tailwind CSS configuration.
11. Follow a clean monochromatic corporate design system.
12. Keep the interface responsive and accessible.
13. Do not use hardcoded API keys, credentials or sensitive information.
14. Do not overwrite existing working code without understanding it.
15. Do not claim that a feature, test or build works without actually verifying it.

PROJECT REQUIREMENTS:

Build a Performance Optimization interface for News Blog.

Follow the supplied Technical Requirements Document:

A. HAPPY PATH
- Users should be able to access and use the interface easily.
- User interactions should respond quickly.
- Data should follow a consistent structure.
- The interface should be straightforward and usable.

B. UNHAPPY PATH
- Display a meaningful empty state when no records or search results exist.
- Show loading indicators during asynchronous operations.
- Handle slow or interrupted network connections gracefully.
- Validate all required form fields.
- Highlight invalid fields clearly.
- Prevent invalid form submissions.

C. ACCESSIBILITY
- Target 100% Lighthouse accessibility.
- Provide accessible labels for inputs and buttons.
- Support keyboard navigation.
- Use appropriate semantic HTML.
- Maintain visible focus indicators.
- Ensure sufficient text contrast.

D. TELEMETRY
When a primary user action is successfully completed, log:

[Analytics] User interacted with Performance Optimization

E. SECURITY
- Sanitize user-provided text before storing it in application state.
- Prevent unsafe HTML rendering.
- Never use dangerouslySetInnerHTML for user-generated content.

F. PERFORMANCE
- Use useMemo for genuinely expensive derived computations.
- Use useCallback where stable function references are useful.
- Avoid unnecessary re-renders.
- Keep the implementation simple. Do not add memoization everywhere without a reason.

WORKFLOW: STRICT PHASE-BY-PHASE DEVELOPMENT

PHASE 1: PROJECT INSPECTION

First inspect the complete existing project.

Check:
- Current folder structure.
- package.json.
- Existing dependencies.
- Existing React components.
- Existing CSS and Tailwind configuration.
- Existing test configuration.
- Existing test files.
- Existing ESLint configuration.
- Existing scripts.

Do not create another project.
Do not run npm create vite.
Do not reinstall dependencies unnecessarily.
Do not delete or rename existing files.
Do not modify application code during this inspection.

PHASE 2: REQUIREMENT ANALYSIS

Read the complete assignment and identify:

- What the application must actually do.
- The minimum useful user workflow.
- Required screens and interactions.
- Data structure required.
- Form validation requirements.
- Loading and empty states.
- Accessibility requirements.
- Security requirements.
- Performance requirements.

IMPORTANT: The ticket does not define exact business fields or a detailed workflow. Do not invent a large business application. Identify the smallest sensible implementation and list any assumptions that need approval.

PHASE 3: TEST-FIRST PLAN

The assignment explicitly requires TDD.

Use the existing Vitest and React Testing Library setup.

Prepare an acceptance test plan covering:

- Main interface rendering.
- Empty state.
- Search and filtering, if applicable to the approved workflow.
- Form validation.
- Invalid input handling.
- Successful primary actions.
- Loading state.
- Input sanitization.
- Keyboard accessibility.

Do not replace the existing test infrastructure.

Do not install Jest if Vitest is already configured.

After the requirements are clear, write the acceptance tests first. Do not implement the application before the tests have been written.

PHASE 4: IMPLEMENTATION

This phase will begin only after approval of the test plan.

Implement the minimum required functionality using the existing project structure.

Follow all assignment requirements and keep the code simple and maintainable.

PHASE 5: FINAL VERIFICATION

After implementation, verify:

- Production build.
- ESLint with zero warnings.
- Acceptance tests.
- Empty state.
- Form validation.
- Loading state.
- Security and sanitization.
- Responsive layout.
- Keyboard accessibility.
- Lighthouse accessibility score.

Do not claim 100% Lighthouse accessibility without an actual Lighthouse report.

PROMPTS.MD REQUIREMENT:

Maintain a PROMPTS.md file in the project root.

Record the exact prompts used throughout development in chronological order.

Do not invent previous prompts or claim that a prompt was used when it was not.

Do not create unnecessary documentation files.

IMPORTANT INSTRUCTIONS FOR THIS FIRST RESPONSE:

For now, complete PHASE 1 and PHASE 2 only.

Do not start coding.
Do not create tests yet.
Do not install anything.
Do not create unnecessary files or folders.

Return a clear report containing:

1. Existing project folder structure.
2. Existing dependencies and versions.
3. Existing scripts.
4. Existing test configuration.
5. Existing files that can be reused.
6. Missing requirements or configuration, if any.
7. Recommended minimum application workflow.
8. Proposed acceptance test cases.
9. Exact files that would need to be created or modified in the next phase.
10. Any assumptions requiring approval.

STOP after providing this report.

Wait for my approval before proceeding to the next phase.

Remember: This is an existing project. Preserve its working setup and make only necessary changes.
```

---

## Prompt 2: Requirement Clarification & Domain Realignment

```text
Your Phase 1 and Phase 2 report has been reviewed.

Before proceeding to implementation, we need to correct and finalize the application requirements.

IMPORTANT FINDINGS:

1. The repository is empty except for its Git initialization and remote connection.
2. No dependencies or application files currently exist.
3. Do not perform additional filesystem-wide searches.
4. Do not clone the repository again.
5. Do not install packages or create files in this step.

REQUIREMENT CLARIFICATION:

The original assignment describes a digital Performance Optimization system intended to replace manual paper-based and Excel-based record management.

However, the assignment does not explicitly define:
- The exact business records.
- The fields required for each record.
- The actual optimization workflow.
- The meaning of the performance metrics.
- Whether the system manages articles, operational records, or another type of performance data.

Your previous proposal introduced article page weight, optimization scores, image compression, lazy loading and minification without these being explicitly specified.

Do not treat these assumptions as confirmed requirements.

YOUR TASK:

1. Re-read the original ticket requirements.
2. Separate explicitly stated requirements from proposed assumptions.
3. Explain the difference between a website performance optimization tool and a digital operational performance record management system.
4. Recommend the smallest practical application that fits the assignment context.
5. Avoid adding unrelated features.
6. Define a simple data structure only after clearly identifying its assumptions.
7. Revise the acceptance test plan to test observable application behaviour rather than internal implementation details.
8. Keep accessibility, validation, loading states, empty states, telemetry and input security as mandatory requirements.
9. Explain how interrupted or slow network operations will be handled without introducing an unnecessary backend or external API.

DO NOT:
- Write application code.
- Create tests.
- Install dependencies.
- Create folders or files.
- Modify Git configuration.
- Perform additional filesystem searches.

FINAL RESPONSE:

Provide:
1. Confirmed requirements.
2. Unconfirmed assumptions.
3. Recommended application purpose.
4. Proposed minimum user workflow.
5. Proposed data fields with justification.
6. Revised acceptance test cases.
7. Minimal expected project file structure.

STOP and wait for approval.

Do not proceed to Phase 3 until the application workflow and requirements are approved.
```

---

## Prompt 3: Project Setup & Test-First Development (Phase 3)

```text
The revised Phase 1 and Phase 2 report has been reviewed.

APPROVED WITH TWO MODIFICATIONS:

1. Treat the News Blog Editorial & Operational Performance Tracker as the selected MVP interpretation of the assignment, not as an explicitly confirmed business specification.
2. Persist records using browser localStorage so records remain available after page refresh. No backend or external database is required.

Now proceed to PHASE 3: PROJECT SETUP AND TEST-FIRST DEVELOPMENT.

PROJECT LOCATION:
D:\Prodesk-IT_Intern\news-blog-performance

GITHUB:
https://github.com/Hemant-Ballia/news-blog-performance

STEP 1: PROJECT INITIALIZATION

The Git repository already exists.

Before creating files:
- Verify the current project directory.
- Preserve the existing .git directory and remote.
- Do not clone again.
- Do not initialize Git again.
- Do not overwrite Git configuration.

Create only the previously approved minimal project structure.

STEP 2: DEPENDENCY INSTALLATION

Use:
- React
- React DOM
- Vite
- Tailwind CSS v4
- @tailwindcss/vite
- ESLint
- Vitest
- jsdom
- React Testing Library
- @testing-library/jest-dom
- @testing-library/user-event

Use compatible stable versions.

Avoid unnecessary dependencies.

Do not install Jest because Vitest is the selected test runner.

Configure these scripts:
- dev
- build
- preview
- test
- test:watch
- lint

STEP 3: CONFIGURATION

Create the minimum required configuration files:
- package.json
- vite.config.js
- eslint.config.js
- index.html
- src/main.jsx
- src/index.css
- src/setupTests.js

Configure React, Tailwind CSS v4, Vitest, JSDOM and ESLint correctly.

STEP 4: PROMPTS.MD

Create PROMPTS.md in the repository root.

Record the actual prompts used so far in chronological order.

Include the initial project inspection, requirement clarification and current implementation prompt.

Do not invent any prompts or claim that they were used if they were not.

STEP 5: WRITE ACCEPTANCE TESTS FIRST

Create src/App.test.jsx.

Write the approved acceptance tests using Vitest and React Testing Library.

Test actual user-visible behaviour.

Include:
- Initial application rendering.
- Accessible headings and form labels.
- Record search and status filtering.
- Empty state and clearing filters.
- Required field validation.
- Invalid input prevention.
- HTML/script sanitization.
- localStorage persistence.
- Loading indicator.
- Simulated network failure.
- Preserving form values after failure.
- Retry behaviour.
- Successful record submission.
- Exact telemetry logging.
- Keyboard accessibility.

Use userEvent and accessible queries wherever appropriate.

For asynchronous tests, use proper async handling and avoid arbitrary long timeouts.

STEP 6: VERIFY TEST SETUP

Run the tests.

Expected result at this stage:
- Test files compile.
- Test runner works.
- Application behaviour tests fail because the implementation does not exist yet.

Do not make the tests pass by weakening or removing assertions.

IMPORTANT RESTRICTIONS:

- Do not create App.jsx implementation yet.
- Do not create additional folders without a clear requirement.
- Do not add charts, authentication, dashboards, APIs or unrelated features.
- Do not add unnecessary packages.
- Do not generate oversized boilerplate.
- Do not modify existing Git history.
- Do not start the application implementation.

FINAL REPORT:

Provide:
1. Exact files created.
2. Exact dependencies and installed versions.
3. Folder structure.
4. Configuration completed.
5. Number of acceptance tests written.
6. Test execution result.
7. Any installation or configuration errors.
8. Confirmation that App.jsx implementation has not started.

STOP after Phase 3 setup and test authoring.

Wait for my review before proceeding to Phase 4 implementation.
```


---

## Prompt 4: Application Implementation (Phase 4)

```text
Phase 3 verification is approved.

Now begin PHASE 4: ACTUAL APPLICATION IMPLEMENTATION.

PROJECT:
ENG-84718 - Performance Optimization for News Blog

PROJECT DIRECTORY:
D:\Prodesk-IT_Intern\news-blog-performance

The project setup, dependencies, configuration and 11 acceptance tests are already completed.

Your primary responsibility is to implement the application so that all existing acceptance tests pass.

IMPORTANT: Read the complete existing src/App.test.jsx before writing implementation code.

STRICT RULES:

1. Do not modify, delete, weaken or skip existing test assertions.
2. Do not replace the test suite.
3. Do not add unnecessary dependencies.
4. Do not create additional folders unless genuinely required.
5. Keep the implementation straightforward and understandable.
6. Use normal React functional components and JavaScript.
7. Prefer a single App.jsx implementation unless a separate file is genuinely necessary.
8. Use existing Tailwind CSS v4 setup.
9. Do not introduce unnecessary animations, gradients, charts or decorative effects.
10. Do not use artificial comments or unnecessarily complicated code.
11. Do not use dangerouslySetInnerHTML.
12. Do not claim tests pass without running them.

APPLICATION PURPOSE:

Build a News Blog Editorial & Operational Performance Tracker.

It should allow newsroom staff to maintain structured performance records instead of using manual paper records and Excel sheets.

REQUIRED FEATURES:

A. DASHBOARD

Display:
- Total Records.
- Optimized Records.
- Average Turnaround Time.

Calculate derived values from the actual records.

Use useMemo for filtered records and summary calculations where useful.

B. RECORD MANAGEMENT

Each record should contain:

- title
- category
- turnaroundTime
- status
- notes

Provide a simple form to add new records.

Use the approved categories and status values from the existing acceptance tests.

C. SEARCH AND FILTER

- Search records by title and notes.
- Filter by status.
- Update visible records immediately when filters change.
- Display a meaningful empty state.
- Provide a Clear Search action to restore the list.

D. FORM VALIDATION

- Title is required and must contain at least 3 valid characters.
- Category is required.
- Turnaround time must be a positive integer.
- Status is required.
- Notes are required and must contain at least 5 valid characters.

Show inline validation messages.

Mark invalid fields using aria-invalid="true".

Connect error messages using aria-describedby.

Do not save invalid records.

E. INPUT SANITIZATION

Sanitize user-provided text before storing it in React state.

Remove unsafe HTML and script markup from title and notes.

Render user content as ordinary React text.

Never use dangerouslySetInnerHTML.

F. LOCAL STORAGE

- Load saved records when the application starts.
- Save records when they change.
- Preserve records after browser refresh.
- Handle invalid or corrupted localStorage data safely.
- Do not lose existing valid records when adding new records.

G. ASYNCHRONOUS SAVE

Implement a simple asynchronous save operation.

Requirements:
- Display a visible Saving... indicator.
- Disable the submit button during saving.
- Prevent duplicate submissions.
- Preserve form values if the operation fails.
- Show an accessible error message.
- Provide a Retry action.

Implement a deterministic network interruption simulation that works with the existing acceptance tests.

Do not introduce real API calls or backend services.

H. TELEMETRY

Only after a successful primary action, log exactly:

console.log('[Analytics] User interacted with Performance Optimization');

Do not log telemetry for invalid submissions or failed save attempts.

I. ACCESSIBILITY

- Semantic HTML.
- Proper labels.
- Accessible buttons.
- Keyboard navigation.
- Visible focus indicators.
- Appropriate ARIA attributes.
- Accessible loading and error announcements.
- Sufficient contrast.

Target 100% Lighthouse accessibility.

Do not claim this score without an actual Lighthouse audit.

J. DESIGN

Create a clean monochromatic corporate interface.

Use:
- White and neutral backgrounds.
- Dark readable typography.
- Simple borders.
- Consistent 16px and 32px spacing.
- Responsive layout.
- Simple record cards or table.
- Clear form sections.

Avoid:
- Gradients.
- Heavy shadows.
- Excessive rounded cards.
- Unnecessary animations.
- Random colors.
- Decorative dashboard charts.
- Unrequested features.

IMPLEMENTATION PROCESS:

1. Read all existing acceptance tests.
2. Identify exact labels, button names, test data and expected interactions.
3. Implement App.jsx to satisfy those tests.
4. Update index.css only when necessary.
5. Update PROMPTS.md by appending this actual implementation prompt.
6. Do not modify existing configuration unless a real implementation issue requires it.

After implementation, run:

npm test
npm run lint
npm run build

Fix implementation issues if any tests fail.

Do not modify tests just to achieve a passing result.

FINAL REPORT:

Provide:
1. Files modified.
2. Features implemented.
3. Test results with passed/failed counts.
4. ESLint result.
5. Production build result.
6. Any remaining issues.
7. Confirmation that localStorage persistence works.

STOP after implementation and verification.

Do not create a Git commit or push to GitHub yet. Wait for my review.
```
