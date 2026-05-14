import { ChevronLeft, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BreadcrumbBarProps {
  title: string;
  breadcrumbs?: Array<{
    label: string;
    onClick?: () => void;
  }>;
  showFilter?: boolean;
  onFilterClick?: () => void;
}

export function BreadcrumbBar({
  title,
  breadcrumbs,
  showFilter = false,
  onFilterClick,
}: BreadcrumbBarProps) {
  return (
    <div className="h-14 border-b border-border flex items-center px-6 justify-between bg-card/20 sticky top-0 z-20">
      <div className="flex items-center gap-2">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={breadcrumbs[0].onClick}
              className="h-6 px-0 text-xs text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft size={14} />
            </Button>
            {breadcrumbs.map((crumb, idx) => (
              <div key={idx} className="flex items-center gap-2">
                {idx > 0 && <span className="text-xs text-muted-foreground">/</span>}
                <button
                  onClick={crumb.onClick}
                  className="text-xs font-semibold cursor-pointer hover:text-accent transition-colors"
                >
                  {crumb.label}
                </button>
              </div>
            ))}
          </>
        )}
        {!breadcrumbs || breadcrumbs.length === 0 ? (
          <h1 className="text-xs font-semibold cursor-pointer hover:text-accent transition-colors">
            {title}
          </h1>
        ) : (
          <span className="text-xs text-foreground line-clamp-1">{title}</span>
        )}
      </div>
      {showFilter && (
        <Button variant="ghost" size="icon" onClick={onFilterClick} className="h-8 w-8">
          <Filter size={16} />
        </Button>
      )}
    </div>
  );
}
