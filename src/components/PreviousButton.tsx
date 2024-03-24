import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

interface PreviousButtonProps {
  pagination: string;
}

export function PreviousButton({pagination}: PreviousButtonProps) {

  function goToPreviousPage() {

  }

  return <button onClick={() => goToPreviousPage()}><NavigateBeforeIcon /></button>;
}
