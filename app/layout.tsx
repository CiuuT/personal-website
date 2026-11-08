import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "../component/SiteHeader";
import SiteFooter from "../component/SiteFooter";

export const metadata: Metadata = {
  title: "Chuhang Liu — Public Policy, Technology & Data",
  description: "Chuhang Liu holds an MPP from Duke University and works at the intersection of technology, data-driven policy, and social reform. Explore projects in legal research and global education policy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* 背景层 */}
        <div className="soft-ripple-bg" aria-hidden="true"></div>

        {/* 内容层（放前面以覆盖背景） */}
        <div className="relative z-10 site-frame">
          <a className="skip-link" href="#main-content">Skip to content</a>
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
