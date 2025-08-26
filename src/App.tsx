import { Box, Button, OutlinedInput, Typography, type SxProps, type Theme } from '@mui/material';
import React, { useCallback, useState } from 'react';

const firstNames = ["Jane", "John", "Alice", "Bob", "Emma", "Liam", "Olivia", "Noah"];
const lastNames = ["Doe", "Smith", "Johnson", "Brown", "Davis", "Miller", "Wilson", "Taylor"];

const getData = Array.from({ length: 100 }, (_, i) => ({
  id: (i + 1).toString(),
  firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
  lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
}));

interface DataTableTemplateProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  onClick?: (e: React.SyntheticEvent) => void;
};
export const DataTableTemplate = (props: DataTableTemplateProps) => {
  const { children, sx, onClick } = props;
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "50px 150px 150px auto",
        px: 2,
        alignItems: "center",
        ...sx
      }}
      onClick={onClick}
    >
      {children}
    </Box>
  )
}

interface DataTableProps {
  data: any;
  onSave: (item: any) => void;
}
export const DataTable = (props: DataTableProps) => {
  const { data, onSave } = props;
  return (
    <Box sx={{ m: 2 }}>
      <DataTableTemplate
        sx={{
          py: 1,
          mb: 1.5,
          borderBottom: "solid 1px #ddd"
        }}
      >
        <Typography variant="body2">ID</Typography>
        <Typography variant="body2">First Name</Typography>
        <Typography variant="body2">Last Name</Typography>
      </DataTableTemplate>
      {data.map((x) => (
        <DataTableItem
          key={x.id}
          item={x}
          onSave={onSave}
        />
      ))}
    </Box>
  )
}

interface DataTableItemProps {
  item: any;
  onSave: (item: any) => void;
}
export const DataTableItem = React.memo((props: DataTableItemProps) => {
  const { item, onSave } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [firstName, setFirstName] = useState(item.firstName);
  const [lastName, setLastName] = useState(item.lastName);

  const handleSave = () => {
    onSave({
      id: item.id,
      firstName,
      lastName
    });
    setIsEdit(false);
  }

  const handleCancel = () => {
    setFirstName(item.firstName);
    setLastName(item.lastName);
    setIsEdit(false);
  }

  if (isEdit) {
    return (
      <DataTableTemplate
        sx={{ py: 0.75 }}
      >
        <Typography variant="body2">{item.id}</Typography>
        <OutlinedInput size="small" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <OutlinedInput size="small" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <Box>
          <Button size="small" variant="contained" color="primary" onClick={handleSave}> Done </Button>
          <Button size="small" variant="contained" color="error" onClick={handleCancel}> Cancel </Button>
        </Box>
      </DataTableTemplate>
    )
  }

  return (
    <DataTableTemplate
      sx={{ py: 0.75 }}
      onClick={() => setIsEdit(!isEdit)}
    >
      <Typography variant="body2">{item.id}</Typography>
      <Typography variant="body2">{firstName}</Typography>
      <Typography variant="body2">{lastName}</Typography>
    </DataTableTemplate>
  )
})

function App() {
  const [data, setData] = useState(getData);

  const handleSave = useCallback((item: any) => {
    setData(prev =>
      prev.map(row => (row.id === item.id ? { ...row, ...item } : row))
    );
  }, []);

  return (
    <>
      <DataTable
        data={data}
        onSave={handleSave}
      />
    </>
  )
}

export default App;