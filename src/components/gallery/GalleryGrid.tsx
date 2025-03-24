
import React, { useMemo, memo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import LazyMediaItem from '@/components/LazyMediaItem';
import { useIsMobile } from '@/hooks/use-breakpoint';
import { DetailedMediaInfo } from '@/api/imageApi';

interface GalleryGridProps {
  mediaIds: string[];
  selectedIds: string[];
  onSelectId: (id: string) => void;
  columnsCount: number;
  viewMode?: 'single' | 'split';
  showDates?: boolean;
  updateMediaInfo?: (id: string, info: DetailedMediaInfo | null) => void;
  position?: 'source' | 'destination';
}

// Memoized version of LazyMediaItem
const MemoizedLazyMediaItem = memo(LazyMediaItem);

const GalleryGrid: React.FC<GalleryGridProps> = ({
  mediaIds,
  selectedIds,
  onSelectId,
  columnsCount,
  viewMode = 'single',
  showDates = false,
  updateMediaInfo,
  position = 'source'
}) => {
  const isMobile = useIsMobile();
  
  // Generate grid style based on columns count - memoized
  const gridStyle = useMemo(() => {
    return { 
      gridTemplateColumns: `repeat(${columnsCount}, minmax(0, 1fr))`
    };
  }, [columnsCount]);
  
  // Determine gap class based on device and view mode - memoized
  const gapClass = useMemo(() => {
    if (isMobile) {
      return 'gap-1';
    }
    return 'gap-4';
  }, [isMobile]);
  
  return (
    <div 
      className={cn("grid w-full content-start p-1 gallery-grid overflow-y-auto", gapClass)}
      style={gridStyle}
    >
      <AnimatePresence>
        {mediaIds.map((id, index) => (
          <MemoizedLazyMediaItem
            key={id}
            id={id}
            selected={selectedIds.includes(id)}
            onSelect={() => onSelectId(id)}
            index={index}
            showDates={showDates}
            updateMediaInfo={updateMediaInfo}
            position={position}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default memo(GalleryGrid);
