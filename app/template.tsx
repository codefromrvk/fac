// Templates remount on every navigation, so each page fades in instead of
// cutting straight from the 3D home page to About and back.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
