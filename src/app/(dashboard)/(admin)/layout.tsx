import React, { Fragment } from 'react'
interface Props {
    children: React.ReactNode;
}
export default function AdminLayout({ children }: Props) {
    return (
        <Fragment>
            {children}
        </Fragment>
    )
}
