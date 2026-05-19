import { Star, Share2, Presentation, Download, Settings } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { usePrestoStore } from '@/store/usePrestoStore'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useState } from 'react'

export function Breadcrumb() {
  const navigate = useNavigate()
  const location = useLocation()
  const { currentView } = usePrestoStore()
  const [isFavorite, setIsFavorite] = useState(false)

  interface BreadcrumbItem {
    label: string
    onClick?: () => void
  }

  const isDetailPage = location.pathname.includes('/insights/') && location.pathname !== '/insights'

  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: 'Home',
      onClick: () => navigate('/')
    },
    {
      label: 'Insights',
      onClick: () => navigate('/insights')
    },
    ...(isDetailPage && currentView?.title ? [{ label: currentView.title }] : [])
  ]

  return (
    <div className="px-6 flex items-center justify-between w-full h-full">
      {/* First inner div: Breadcrumb + Star (only on detail) */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {breadcrumbs.map((crumb, idx) => (
          <div key={idx} className="flex items-center gap-2">
            {idx > 0 && <span className="text-muted-foreground/50">/</span>}
            {crumb?.onClick ? (
              <Button
                variant="ghost"
                size="sm"
                className="h-5 px-0 text-sm font-normal text-muted-foreground hover:text-foreground transition-colors"
                onClick={crumb.onClick}
              >
                {crumb.label}
              </Button>
            ) : (
              <span className="h-5 px-0 text-sm font-normal text-muted-foreground inline-flex items-center">{crumb?.label}</span>
            )}
          </div>
        ))}

        {/* Star button - only on detail page */}
        {isDetailPage && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Star size={16} fill={isFavorite ? "currentColor" : "none"} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add to favorites</TooltipContent>
          </Tooltip>
        )}
      </div>

      {/* Second inner div: Action buttons (only on detail page) - right aligned */}
      {isDetailPage && (
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Presentation size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Presentation</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Download size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Export</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Settings size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Settings</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 px-3 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <Share2 size={16} />
                <span>Share</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Share</TooltipContent>
          </Tooltip>
        </div>
      )}
    </div>
  )
}
