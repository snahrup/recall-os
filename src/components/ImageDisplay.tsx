
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Image as ImageIcon, X, ZoomIn } from 'lucide-react';

interface ImageDisplayProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  className?: string;
  size?: 'thumbnail' | 'small' | 'medium' | 'large';
  showZoom?: boolean;
  fallback?: React.ReactNode;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({
  src,
  alt = 'Image',
  className,
  size = 'medium',
  showZoom = true,
  fallback,
  onClick,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const sizeClasses = {
    thumbnail: 'w-8 h-8',
    small: 'w-16 h-16',
    medium: 'w-32 h-32',
    large: 'w-64 h-64'
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError && fallback) {
    return <>{fallback}</>;
  }

  if (hasError) {
    return (
      <div className={cn(
        'bg-slate-700 border border-slate-600 rounded flex items-center justify-center',
        sizeClasses[size],
        className
      )}>
        <ImageIcon className="w-4 h-4 text-slate-400" />
      </div>
    );
  }

  return (
    <>
      <div className={cn('relative group', className)}>
        {isLoading && (
          <div className={cn(
            'bg-slate-700 border border-slate-600 rounded flex items-center justify-center animate-pulse',
            sizeClasses[size]
          )}>
            <ImageIcon className="w-4 h-4 text-slate-400" />
          </div>
        )}
        <img
          src={src}
          alt={alt}
          className={cn(
            'object-cover rounded border border-slate-600',
            sizeClasses[size],
            isLoading ? 'hidden' : 'block',
            showZoom && 'cursor-pointer hover:brightness-110 transition-all'
          )}
          onLoad={handleImageLoad}
          onError={handleImageError}
          onClick={(e) => {
            if (showZoom) setIsExpanded(true);
            onClick?.(e);
          }}
          {...props}
        />
        {showZoom && !isLoading && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded flex items-center justify-center">
            <ZoomIn className="w-4 h-4 text-white" />
          </div>
        )}
      </div>

      {/* Expanded view modal */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setIsExpanded(false)}>
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-full object-contain rounded"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageDisplay;
