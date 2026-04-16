import { Car } from "lucide-react";
import React from "react";
import {
  CarouselNext,
  CarouselPrevious,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";
import { Button } from "@base-ui/react";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

function CategoryCarousel() {
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="flex w-[280px] shrink-0 grow-0 justify-center"
            >
              <div className="flex w-full items-center justify-center py-4">
                <Button
                  variant="outline"
                  className="w-full rounded-full bg-gray-200 text-black px-6 py-3 text-center"
                >
                  {cat}
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default CategoryCarousel;
