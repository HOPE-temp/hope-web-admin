import type { ReactNode } from "react"

interface StatsCardProps {
  icon: ReactNode
  value: string
  label: string
  bgColor: string
}

export default function StatsCard({ icon, value, label, bgColor }: StatsCardProps) {
  return (
    <div className="text-center">
      <div className={`${bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>{icon}</div>
      <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
      <p className="text-gray-600">{label}</p>
    </div>
  )
}
