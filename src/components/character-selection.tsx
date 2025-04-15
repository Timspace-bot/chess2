'use client';

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export interface Character {
  id: string;
  name: string;
  image: string;
  bgColor: string;
}

interface CharacterSelectionProps {
  characters: Character[];
  onSelect: (character: Character) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side: 'left' | 'right';
}

export function CharacterSelection({
  characters,
  onSelect,
  open,
  onOpenChange,
  side
}: CharacterSelectionProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [cardHeight, setCardHeight] = useState(500); // Default height
  const carouselRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Adjust card height based on container size
  useEffect(() => {
    if (open && containerRef.current) {
      const updateCardHeight = () => {
        const containerHeight = containerRef.current?.clientHeight || 0;
        // Set card height to 80% of container height
        setCardHeight(Math.min(500, containerHeight * 0.8));
      };
      
      updateCardHeight();
      window.addEventListener('resize', updateCardHeight);
      
      return () => {
        window.removeEventListener('resize', updateCardHeight);
      };
    }
  }, [open]);

  const handlePrevious = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSlideDirection('right');
    setSelectedIndex((prev) => (prev === 0 ? characters.length - 1 : prev - 1));
    
    // Reset slide direction after animation
    setTimeout(() => {
      setSlideDirection(null);
      setIsAnimating(false);
    }, 300);
  };

  const handleNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSlideDirection('left');
    setSelectedIndex((prev) => (prev === characters.length - 1 ? 0 : prev + 1));
    
    // Reset slide direction after animation
    setTimeout(() => {
      setSlideDirection(null);
      setIsAnimating(false);
    }, 300);
  };

  const handleSelect = () => {
    onSelect(characters[selectedIndex]);
    onOpenChange(false);
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(0);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollLeft > 50) {
      handlePrevious();
    } else if (scrollLeft < -50) {
      handleNext();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = x - startX;
    setScrollLeft(walk);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(0);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (scrollLeft > 50) {
      handlePrevious();
    } else if (scrollLeft < -50) {
      handleNext();
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = x - startX;
    setScrollLeft(walk);
  };

  // Scroll wheel handler
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (isAnimating) return;
    
    // Determine scroll direction
    if (e.deltaY > 0) {
      // Scrolling down/right
      handleNext();
    } else {
      // Scrolling up/left
      handlePrevious();
    }
  };

  // Get previous and next indices
  const prevIndex = selectedIndex === 0 ? characters.length - 1 : selectedIndex - 1;
  const nextIndex = selectedIndex === characters.length - 1 ? 0 : selectedIndex + 1;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#2a2c3b] text-white border-none w-[90vw] max-w-[1200px] h-[90vh] p-0 m-0 rounded-xl overflow-hidden">
        <DialogTitle className="sr-only">Character Selection for {side === 'left' ? 'Player 1' : 'Player 2'}</DialogTitle>
        <div className="flex flex-col h-full" ref={containerRef}>
          <div className="p-8 flex-grow flex flex-col">
            <h2 className="text-4xl font-bold text-center mb-8">
              Select Character for {side === 'left' ? 'Player 1' : 'Player 2'}
            </h2>
            
            <div className="flex items-center justify-center flex-grow">
              {/* Previous Button */}
              <Button
                variant="ghost"
                className="h-full px-8 text-4xl hover:bg-white/10 transition-colors"
                onClick={handlePrevious}
                disabled={isAnimating}
              >
                &#8249;
              </Button>
              
              {/* Character Cards Carousel */}
              <div 
                ref={carouselRef}
                className="flex space-x-8 h-full items-center justify-center select-none"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onMouseMove={handleMouseMove}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchMove={handleTouchMove}
                onWheel={handleWheel}
              >
                {/* Show previous character (smaller) */}
                {characters.length > 1 && (
                  <div 
                    className={cn(
                      "w-40 transition-all duration-300 transform opacity-50 scale-90",
                      slideDirection === 'right' && "animate-slide-right",
                      slideDirection === 'left' && "animate-slide-left"
                    )}
                    style={{ 
                      height: cardHeight * 0.7,
                      transform: isDragging ? `translateX(${scrollLeft}px)` : ''
                    }}
                  >
                    <div 
                      className={`w-full h-full rounded-xl overflow-hidden ${
                        characters[prevIndex].bgColor
                      } flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300`}
                    >
                      <div className="w-full h-full flex flex-col items-center justify-center p-4">
                        <div className="text-white text-xl font-bold mb-2">
                          {characters[prevIndex].name}
                        </div>
                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                          {characters[prevIndex].name.substring(0, 1)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Current character (larger) */}
                <div 
                  className={cn(
                    "w-48 transition-all duration-300 transform z-10 scale-100",
                    slideDirection === 'right' && "animate-slide-right",
                    slideDirection === 'left' && "animate-slide-left"
                  )}
                  style={{ 
                    height: cardHeight,
                    transform: isDragging ? `translateX(${scrollLeft}px)` : ''
                  }}
                >
                  <div 
                    className={`w-full h-full rounded-xl overflow-hidden ${characters[selectedIndex].bgColor} shadow-xl transition-all duration-300 hover:shadow-2xl`}
                  >
                    <div className="w-full h-full flex flex-col items-center justify-center p-4">
                      <div className="text-white text-2xl font-bold mb-4">
                        {characters[selectedIndex].name}
                      </div>
                      <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-4xl font-bold">
                        {characters[selectedIndex].name.substring(0, 1)}
                      </div>
                      <Button 
                        variant="default" 
                        className="mt-auto mb-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-200 hover:scale-105"
                        onClick={handleSelect}
                      >
                        Select
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Show next character (smaller) */}
                {characters.length > 1 && (
                  <div 
                    className={cn(
                      "w-40 transition-all duration-300 transform opacity-50 scale-90",
                      slideDirection === 'right' && "animate-slide-right",
                      slideDirection === 'left' && "animate-slide-left"
                    )}
                    style={{ 
                      height: cardHeight * 0.7,
                      transform: isDragging ? `translateX(${scrollLeft}px)` : ''
                    }}
                  >
                    <div 
                      className={`w-full h-full rounded-xl overflow-hidden ${
                        characters[nextIndex].bgColor
                      } flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300`}
                    >
                      <div className="w-full h-full flex flex-col items-center justify-center p-4">
                        <div className="text-white text-xl font-bold mb-2">
                          {characters[nextIndex].name}
                        </div>
                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                          {characters[nextIndex].name.substring(0, 1)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Next Button */}
              <Button
                variant="ghost"
                className="h-full px-8 text-4xl hover:bg-white/10 transition-colors"
                onClick={handleNext}
                disabled={isAnimating}
              >
                &#8250;
              </Button>
            </div>
            
            <div className="text-center mt-8 text-gray-400">
              <p>Use mouse wheel or swipe to scroll through characters</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
