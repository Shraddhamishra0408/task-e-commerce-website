import * as React from "react"
import {
  Carousel as CarouselPrimitive,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  CarouselItem,
} from "vaul-carousel"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const Carousel = React.forwardRef<
  React.ElementRef<typeof CarouselPrimitive>,
  React.ComponentPropsWithoutRef<typeof CarouselPrimitive>
>(({ className, ...props }, ref) => (
  <div className="relative">
    <CarouselPrimitive
      ref={ref}
      className={cn("w-full overflow-hidden", className)}
      {...props}
    />
  </div>
))
Carousel.displayName = CarouselPrimitive.displayName

const CarouselControl = () => {
  return (
    <div className="absolute z-10 bottom-4 left-1/2 flex -translate-x-1/2 items-center space-x-1">
      <CarouselPrevious>
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous</span>
        </Button>
      </CarouselPrevious>
      <CarouselNext>
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next</span>
        </Button>
      </CarouselNext>
    </div>
  )
}

export { Carousel, CarouselContent, CarouselItem, CarouselControl }
