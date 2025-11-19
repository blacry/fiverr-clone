import RoleGuard from "@/components/role-guard";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleGuard allowedRole="client">{children}</RoleGuard>;
}
