function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <>
      <style>{`
        @keyframes skeleton-shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        .skeleton-loader {
          background: linear-gradient(
            90deg,
            rgba(100, 100, 100, 0.2) 0%,
            rgba(150, 150, 150, 0.4) 50%,
            rgba(100, 100, 100, 0.2) 100%
          );
          background-size: 1000px 100%;
          animation: skeleton-shimmer 2s infinite;
        }
      `}</style>
      <div
        className={`skeleton-loader rounded-md ${className}`}
        style={{ minHeight: '1rem', ...props.style }}
        {...props}
      />
    </>
  )
}

export { Skeleton }
