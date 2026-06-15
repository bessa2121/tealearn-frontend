import Sidebar from "./Sidebar";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({
  children,
}: Props) {
  return (
    <div className="flex bg-slate-50">
      <Sidebar />

      <main className="flex-1">
        <Header />

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}   