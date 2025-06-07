
import React, { useState } from 'react';
import ImageDisplay from './ImageDisplay';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Grid } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  className?: string;
  thumbnailSize?: 'thumbnail' | 'small';
  maxVisible?: number;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images, 
  className,
  thumbnailSize = 'small',
  maxVisible = 3
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'thumbnails' | 'carousel'>('thumbnails');

  if (!images || images.length === 0) {
    return null;
  }

  if (images.length === 1) {
    return (
      <div className={className}>
        <ImageDisplay src={images[0]} size={thumbnailSize} />
      </div>
    );
  }

  if (viewMode === 'thumbnails') {
    const visibleImages = images.slice(0, maxVisible);
    const remainingCount = images.length - maxVisible;

    return (
      <div className={`flex gap-2 items-center ${className}`}>
        {visibleImages.map((image, index) => (
          <ImageDisplay
            key={index}
            src={image}
            size={thumbnailSize}
            onClick={() => {
              setSelectedIndex(index);
              setViewMode('carousel');
            }}
          />
        ))}
        {remainingCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-1 text-xs text-slate-400 hover:text-white"
            onClick={() => setViewMode('carousel')}
          >
            <Grid className="w-3 h-3 mr-1" />
            +{remainingCount}
          </Button>
        )}
      </div>
    );
  }

  // Carousel mode
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400">
          {selectedIndex + 1} of {images.length}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setViewMode('thumbnails')}
          className="h-auto p-1 text-xs"
        >
          <Grid className="w-3 h-3" />
        </Button>
      </div>
      
      <div className="relative">
        <ImageDisplay src={images[selectedIndex]} size="medium" />
        
        {images.length > 1 && (
          <div className="flex gap-1 mt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedIndex(Math.max(0, selectedIndex - 1))}
              disabled={selectedIndex === 0}
              className="h-6 px-2"
            >
              <ChevronLeft className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedIndex(Math.min(images.length - 1, selectedIndex + 1))}
              disabled={selectedIndex === images.length - 1}
              className="h-6 px-2"
            >
              <ChevronRight className="w-3 h-3" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
