import RoleGuard from "@/components/role-guard";

export default function LifterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleGuard allowedRole="lifter">{children}</RoleGuard>;
}
