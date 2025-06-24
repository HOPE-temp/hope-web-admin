import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface SuccessStoryProps {
  name: string
  date: string
  description: string
  imageUrl: string
  imageAlt: string
}

export default function SuccessStory({ name, date, description, imageUrl, imageAlt }: SuccessStoryProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image src={imageUrl || "/placeholder.svg"} alt={imageAlt} fill className="object-cover" />
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription>{date}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">{description}</p>
      </CardContent>
    </Card>
  )
}
