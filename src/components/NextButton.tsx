import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface NextButtonProps {
  pagination: string;
}

export function NextButton({ pagination }: NextButtonProps) {
  function goToNextPage() {
    const data = fetch(`https://api.twitch.tv/helix/clips?broadcaster_id=${broadcasterId}&first=15`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        "Client-Id": import.meta.env.VITE_CLIENT_ID,
      },
    }).then((res) => res.json());

    return data;
  }

  return (
    <button onClick={() => goToNextPage()}>
      <NavigateNextIcon />
    </button>
  );
}
