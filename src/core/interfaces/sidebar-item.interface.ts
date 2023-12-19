import React from "react";

export interface SidebarItem {
    icon?: React.ReactNode;
    text: string;
    link?: string;
    children?: SidebarItem[];
    patterns?: string[];
}