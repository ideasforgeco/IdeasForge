export interface MenuItem {
  id: string;
  label: string;
}

export interface NavbarData {
  logo: string;
  menuItems: MenuItem[];
  ctaButton: string;
}
