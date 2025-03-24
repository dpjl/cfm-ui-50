
import React from 'react';
import { RefreshCw, PanelLeftClose } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import GalleryHeader from '@/components/GalleryHeader';
import { useIsMobile } from '@/hooks/use-breakpoint';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageToggle } from '@/components/LanguageToggle';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  columnsCount: number;
  setColumnsCount: React.Dispatch<React.SetStateAction<number>>;
  selectedIdsLeft: string[];
  selectedIdsRight: string[];
  onRefresh: () => void;
  onDelete: () => void;
  isDeletionPending: boolean;
  isSidebarOpen?: boolean;
  onCloseSidebars?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  columnsCount,
  setColumnsCount,
  selectedIdsLeft,
  selectedIdsRight,
  onRefresh,
  onDelete,
  isDeletionPending,
  isSidebarOpen = false,
  onCloseSidebars
}) => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  // Prepare extra buttons for the header
  const extraControls = (
    <div className="flex items-center gap-2">
      {/* Refresh button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={onRefresh}
              disabled={isDeletionPending}
              className="h-9 w-9"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('refresh')}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Close sidebars button - only shown when at least one sidebar is open */}
      {isSidebarOpen && onCloseSidebars && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onCloseSidebars}
                className="h-9 w-9"
              >
                <PanelLeftClose className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('close_sidebars')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      
      {/* Language toggle */}
      <LanguageToggle />
      
      {/* Theme toggle */}
      <ThemeToggle />
    </div>
  );

  // Custom header logo component
  const Logo = () => (
    <div className="flex items-center px-1 py-0.5">
      <img 
        src="/lovable-uploads/ddf36f1d-ca4f-4437-8e57-df7c6f916ccc.png" 
        alt="Media Analyzer" 
        className={cn(
          "h-auto",
          isMobile ? "w-20 ml-1" : "w-32 ml-1"
        )} 
      />
    </div>
  );

  return (
    <GalleryHeader
      title={<Logo />}
      columnsCount={columnsCount}
      setColumnsCount={setColumnsCount}
      isLoading={false}
      selectedImages={[...selectedIdsLeft, ...selectedIdsRight]}
      onRefresh={onRefresh}
      onDeleteSelected={onDelete}
      isDeletionPending={isDeletionPending}
      extraControls={extraControls}
      hideMobileColumns={true}
      hideDeleteButton={true}
    />
  );
};

export default PageHeader;
