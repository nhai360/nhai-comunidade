import { withAuth } from "@/middlewares";

function VideosPage() {
  return (
    <>
      <h1>Hello</h1>
    </>
  );
}

export default withAuth(VideosPage);
