"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shared/ui";

export default function Home() {
    // return <div>Home</div>;

    return (
        <Carousel>
            <CarouselContent className="h-screen">
                <CarouselItem className="border-2">First</CarouselItem>

                <CarouselItem>Second</CarouselItem>

                <CarouselItem>Third</CarouselItem>
            </CarouselContent>

            <CarouselPrevious />

            <CarouselNext />
        </Carousel>
    );
}
