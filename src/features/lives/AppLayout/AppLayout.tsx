import { DefaultLayout } from "@/layouts/app";
import { useVideoContext } from "@/contexts/VideoContext";
import { Typography } from "@/ui";

export function AppLayout() {
  const { videos } = useVideoContext();
  return (
    <DefaultLayout>
      <DefaultLayout.Header />
      <DefaultLayout.Content>
        <Typography.Text
          size="h3"
          style={{ textAlign: "center", margin: "32px 0 8px" }}
        >
          Suas transmissões
        </Typography.Text>
      </DefaultLayout.Content>
    </DefaultLayout>
  );
}
