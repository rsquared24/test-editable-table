import { render, screen } from '@testing-library/react';
import App from './App';

describe("All", () => {
  test("renders Hello World", () => {
    render(<App />)
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  })
})
