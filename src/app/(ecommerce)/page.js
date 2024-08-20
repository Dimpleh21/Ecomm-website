import Image from "next/image";
import Carousels from "@/components/Carousels";
import FlashSales from "@/components/FlashSales";
import { Separator } from "@/components/ui/separator";
import CategoryList from "@/components/CategoryList";
import Enhancement from "@/components/Enhancement";
export default function Home() {
  return (
    <div>
      <Carousels />
      <div>
        <FlashSales title="Today's" heading="Flash Sales" />
        <Separator className="my-4" />
        <CategoryList />
        <Enhancement />
        <Separator className="my-4" />
        <FlashSales title="Our Products" heading="Explore Our Products" />
      </div>
    </div>
  );
}
