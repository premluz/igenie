import { ChevronRight } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { usePrestoStore } from '@/store/usePrestoStore'

export function Breadcrumb() {
  const navigate = useNavigate()
  const location = useLocation()
  const { currentView } = usePrestoStore()

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
    <div className="px-6 flex items-center gap-2 text-xs text-muted-foreground h-full">
      {breadcrumbs.map((crumb, idx) => (
        <div key={idx} className="flex items-center gap-2">
          {idx > 0 && <ChevronRight size={12} />}
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
    </div>
  )
}
