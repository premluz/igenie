import { AnimatePresence, motion } from 'framer-motion'
import { usePrestoStore } from '@/store/usePrestoStore'
import { useLocation } from 'react-router-dom'

export function PageTransitionOverlay() {
  const { isPageTransitioning } = usePrestoStore()
  const location = useLocation()
  const isLandingPage = location.pathname === '/'

  if (!isPageTransitioning) return null

  // On landing page, show minimal overlay
  if (isLandingPage) {
    return null
  }

  return (
    <AnimatePresence mode="wait">
      {isPageTransitioning && (
        <motion.div
          key="page-transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 pointer-events-none flex"
        >
          {/* LEFT SIDEBAR - Fade out and blur */}
          <motion.div
            initial={{ opacity: 1, filter: 'blur(0px)' }}
            animate={{ opacity: 0, filter: 'blur(20px)' }}
            transition={{ duration: 0.6, delay: 0 }}
            className="w-16 bg-background border-r border-border"
          />

          {/* MAIN CONTENT AREA */}
          <div className="flex-1 flex flex-col">
            {/* BREADCRUMB - Fade out and blur */}
            <motion.div
              initial={{ opacity: 1, filter: 'blur(0px)' }}
              animate={{ opacity: 0, filter: 'blur(20px)' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="h-10 border-b border-border bg-card/0"
            />

            {/* CENTER CANVAS + RIGHT SIDEBAR CONTAINER */}
            <div className="flex-1 flex overflow-hidden">
              {/* CENTER CANVAS - Fade out and blur */}
              <motion.div
                initial={{ opacity: 1, filter: 'blur(0px)' }}
                animate={{ opacity: 0, filter: 'blur(20px)' }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex-1 bg-background"
              />

              {/* RIGHT SIDEBAR PRESTO - Fade out and blur */}
              <motion.div
                initial={{ opacity: 1, filter: 'blur(0px)' }}
                animate={{ opacity: 0, filter: 'blur(20px)' }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-80 bg-card border-l border-border"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
