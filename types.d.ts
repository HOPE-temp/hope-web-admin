type RoleUser = 'admin' | 'volunteer' | 'veterinarian'

interface NavItem {
  href: string
  label: string
  icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >
  active: (pathname: string) => boolean
}