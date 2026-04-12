import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface ServiceCardProps {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  duration_minutes: number;
  image_url?: string;
}

const categoryIcons: Record<string, string> = {
  plumbing: "🔧",
  electrical: "⚡",
  cleaning: "🧹",
  painting: "🎨",
  carpentry: "🪚",
  gardening: "🌿",
  appliance: "🔌",
  pest_control: "🐛",
};

const ServiceCard = ({ id, name, description, category, price, duration_minutes, image_url }: ServiceCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    viewport={{ once: true }}
  >
    <Card className="group overflow-hidden transition-shadow hover:shadow-lg" style={{ boxShadow: "var(--card-shadow)" }}>
      <div className="h-44 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-6xl">
        {categoryIcons[category.toLowerCase()] ?? "🏠"}
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{name}</CardTitle>
          <Badge variant="secondary" className="text-xs capitalize">{category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><DollarSign className="h-3.5 w-3.5" />${price}</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{duration_minutes} min</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/book/${id}`} className="w-full">
          <Button className="w-full" size="sm">Book Now</Button>
        </Link>
      </CardFooter>
    </Card>
  </motion.div>
);

export default ServiceCard;
