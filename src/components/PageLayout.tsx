import type { ReactNode } from "react";

type PageLayoutProps = {
  children: ReactNode;
};

export default function PageLayout({ children }: PageLayoutProps) {
  return <div className="p-8 bg-neutral-300">{children}</div>;
}
