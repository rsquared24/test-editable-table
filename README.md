# Editable Data Table with Optimized Rendering

You are tasked with building a **high-performance editable data table** component in React using TypeScript. The table contains thousands of rows, and each cell should be editable inline.

## Requirements

### Editable Cells
- Clicking a cell switches it to an input field.
- Pressing **Enter** saves the change.
- Pressing **Esc** cancels the edit.

### Optimized Rendering
- Only the **edited row** should re-render.
- Unedited rows should not trigger a re-render when other rows are updated.

### Type Safety
- The table should be **generic over row types** using TypeScript.

### Keyboard Navigation
- Users should be able to navigate between cells using **arrow keys**.

## Unit Tests

1. **Editing a cell** updates the correct row.
2. **Esc key** cancels the edit.
3. Only the **edited row re-renders** (can be tested using a render-count helper or mocked row components).

## Branches

- `main`: Contains the solution completed within the **1-hour time limit**.  
- `feature/complete`: Contains the **full working solution** with additional improvements and optimizations.
