import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Listing = {
  id: string;
  title: string;
  price_cents: number;
  location_text: string;
  category: string;
  created_at: string;
};

const money = (cents: number) =>
  cents <= 0 ? "Free" : new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(cents / 100);

export default function ListingCard({ l }: { l: Listing }) {
  return (
    <Link href={`/market/${l.id}`}>
      <Card className="hover:shadow-sm transition-shadow">
        <CardHeader className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div className="font-medium leading-tight">{l.title}</div>
            <div className="font-semibold">{money(l.price_cents)}</div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{l.category.replaceAll("_", " ")}</Badge>
            {l.location_text ? <Badge variant="outline">{l.location_text}</Badge> : null}
          </div>
        </CardHeader>
        <CardContent className="text-xs text-muted-foreground">
          Posted {new Date(l.created_at).toLocaleDateString()}
        </CardContent>
      </Card>
    </Link>
  );
}
