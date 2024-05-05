import { ReactNode } from 'react';

export default function Sidebar({ children }: { children: ReactNode }) {
    return <div className="sidebar">{children}</div>;
}

export function SidebarTop({ children }: { children: ReactNode }) {
    return <div className="sidebar__top">{children}</div>;
}
