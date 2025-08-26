import { render } from '@testing-library/react';
import { DataTable, DataTableItem } from './App';

jest.mock("./App", () => {
  const original = jest.requireActual("./App");
  return {
    __esModule: true,
    ...original,
    DataTableItem: jest.fn((props: any) => (
      <div data-testId={`${props.item.id}`} />
    ))
  }
})

// TODO: this test is not working as expected, I have a feeling its got something to do with how its being
// mocked. Maybe if we split the files it will work but i ran out of time here

describe("All", () => {
  test("Check that it only renders the changed row", () => {
    const data = [
      { id: "1", firstName: "Jane", lastName: "Doe" },
      { id: "2", firstName: "John", lastName: "Smith" },
    ];

    const { rerender } = render(<DataTable data={data} onSave={() => {}} />);

    expect(DataTableItem).toHaveBeenCalledTimes(data.length);

    const changed = [
      { ...data[0], firstName: "CHANGED", lastName: "NAME" },
      data[1],
    ];

    rerender(<DataTable data={changed} onSave={() => {}} />);

    expect(DataTableItem).toHaveBeenCalledTimes(data.length + 1);
  })
})
