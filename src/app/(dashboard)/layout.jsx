import dynamic from "next/dynamic";

const Sidebar = dynamic(() => import("./components/Sidebar"), {
  ssr: false,
});
export default function DashboardLayout({ children }) {
  return (
    <>
      <Sidebar />
      <main className=" mt-28 md:ml-60 md:py-8 md:mt-0">{children}</main>
    </>
  );
}
