import { ReactNode } from 'react';

export default function Header({ children }: { children: ReactNode }) {
    return <header className="header">{children}</header>;
}

export function HeaderTop({ children }: { children: ReactNode }) {
    return <div className="header__top">{children}</div>;
}
