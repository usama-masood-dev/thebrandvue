"use client";

import { createContext, useContext, type ReactNode } from "react";
import { mainNavItems } from "@/lib/navigation/main-nav";
import type { NavItem } from "@/lib/navigation/nav-types";

const NavigationContext = createContext<NavItem[]>(mainNavItems);

type NavigationProviderProps = {
  items: NavItem[];
  children: ReactNode;
};

export function NavigationProvider({ items, children }: NavigationProviderProps) {
  return (
    <NavigationContext.Provider value={items}>{children}</NavigationContext.Provider>
  );
}

export function useNavigation(): NavItem[] {
  return useContext(NavigationContext);
}
