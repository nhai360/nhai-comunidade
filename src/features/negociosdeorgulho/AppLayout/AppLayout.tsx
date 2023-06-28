import { DefaultLayout } from "@/layouts/app";

type Props = {
  hasSider?: boolean;
};

export function AppLayout({ hasSider }: Props) {
  return (
    <DefaultLayout>
      <DefaultLayout.Header />
    </DefaultLayout>
  );
}
