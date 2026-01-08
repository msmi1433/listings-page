import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-40">
      <h3>Welcome Home everyone!</h3>
    </div>
  );
}
