import { Search, Download, Settings2, Share2 } from 'lucide-react'

export function SearchFilterBar() {
  return (
    <div className="flex items-center gap-3">
      {/* Search input */}
      <div className="w-72">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search brand"
            className="w-full pl-9 pr-4 py-2 bg-card border border-border/20 rounded-md text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-white/30"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        {/* Showing X brands dropdown */}
        <select className="px-3 py-2 bg-card border border-border/20 rounded-md text-sm text-foreground focus:outline-none focus:border-white/30 cursor-pointer">
          <option>24 brands</option>
          <option>12 brands</option>
          <option>All brands</option>
        </select>

        {/* Date range */}
        <input
          type="text"
          defaultValue="Aug 2024 - Sep 2025"
          className="px-3 py-2 bg-card border border-border/20 rounded-md text-sm text-foreground focus:outline-none focus:border-white/30 whitespace-nowrap"
          readOnly
        />
      </div>

      {/* Icon buttons */}
      <div className="flex items-center gap-1">
        <button className="p-1.5 hover:bg-card/50 rounded-md transition-colors text-muted-foreground hover:text-foreground">
          <Download className="w-4 h-4" />
        </button>
        <button className="p-1.5 hover:bg-card/50 rounded-md transition-colors text-muted-foreground hover:text-foreground">
          <Settings2 className="w-4 h-4" />
        </button>
        <button className="p-1.5 hover:bg-card/50 rounded-md transition-colors text-muted-foreground hover:text-foreground">
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
