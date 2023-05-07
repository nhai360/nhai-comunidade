import { DefaultLayout } from "@/layouts/desktop";

import { MainTrends } from "@/features/feed";

export function DesktopLayout() {
  return (
    <DefaultLayout>
      <DefaultLayout.GridWithSider>
        <DefaultLayout.Content css={{ gap: "$6" }}>
          <h1>Hello</h1>
        </DefaultLayout.Content>
        <DefaultLayout.Sider>
          <MainTrends />
        </DefaultLayout.Sider>
      </DefaultLayout.GridWithSider>
    </DefaultLayout>
  );
}
