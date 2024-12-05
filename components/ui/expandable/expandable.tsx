"use client"

import * as React from "react"
import { AnimatePresence, motion, MotionProps } from "framer-motion"

type ExpandDirection = "vertical" | "horizontal" | "both"
type ExpandBehavior = "push" | "overlay" | "replace"

interface ExpandableContextValue {
  isExpanded: boolean
  onToggle: () => void
  expandDirection: ExpandDirection
  expandBehavior: ExpandBehavior
}

const ExpandableContext = React.createContext<ExpandableContextValue | undefined>(
  undefined
)

interface ExpandableProps {
  children: React.ReactNode | ((props: { isExpanded: boolean }) => React.ReactNode)
  expanded?: boolean
  onToggle?: () => void
  expandDirection?: ExpandDirection
  expandBehavior?: ExpandBehavior
  initialDelay?: number
  onExpandStart?: () => void
  onExpandEnd?: () => void
}

export function Expandable({
  children,
  expanded: controlledExpanded,
  onToggle: controlledOnToggle,
  expandDirection = "vertical",
  expandBehavior = "push",
  initialDelay = 0,
  onExpandStart,
  onExpandEnd,
}: ExpandableProps) {
  const [uncontrolledExpanded, setUncontrolledExpanded] = React.useState(false)

  const isControlled = controlledExpanded !== undefined
  const isExpanded = isControlled ? controlledExpanded : uncontrolledExpanded

  const handleToggle = React.useCallback(() => {
    if (isControlled) {
      controlledOnToggle?.()
    } else {
      setUncontrolledExpanded((prev) => !prev)
    }
  }, [isControlled, controlledOnToggle])

  const contextValue = React.useMemo(
    () => ({
      isExpanded,
      onToggle: handleToggle,
      expandDirection,
      expandBehavior,
    }),
    [isExpanded, handleToggle, expandDirection, expandBehavior]
  )

  return (
    <ExpandableContext.Provider value={contextValue}>
      {typeof children === "function" ? children({ isExpanded }) : children}
    </ExpandableContext.Provider>
  )
}

interface ExpandableTriggerProps {
  children: React.ReactNode
  asChild?: boolean
}

export function ExpandableTrigger({
  children,
  asChild = false,
}: ExpandableTriggerProps) {
  const context = React.useContext(ExpandableContext)
  if (!context) throw new Error("ExpandableTrigger must be used within Expandable")

  const { onToggle } = context

  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      onClick: onToggle,
    })
  }

  return (
    <div onClick={onToggle} style={{ cursor: "pointer" }}>
      {children}
    </div>
  )
}

interface Size {
  width: number
  height: number
}

interface ExpandableCardProps {
  children: React.ReactNode
  className?: string
  collapsedSize: Size
  expandedSize: Size
  hoverToExpand?: boolean
  expandDelay?: number
  collapseDelay?: number
}

export function ExpandableCard({
  children,
  className,
  collapsedSize,
  expandedSize,
  hoverToExpand = false,
  expandDelay = 0,
  collapseDelay = 0,
}: ExpandableCardProps) {
  const context = React.useContext(ExpandableContext)
  if (!context) throw new Error("ExpandableCard must be used within Expandable")

  const { isExpanded, expandDirection, expandBehavior } = context
  const [isHovered, setIsHovered] = React.useState(false)

  const shouldExpand = isExpanded || (hoverToExpand && isHovered)

  const variants = {
    collapsed: {
      width: collapsedSize.width,
      height: collapsedSize.height,
      transition: {
        delay: collapseDelay / 1000,
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    expanded: {
      width: expandedSize.width,
      height: expandedSize.height,
      transition: {
        delay: expandDelay / 1000,
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  }

  return (
    <motion.div
      className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden ${
        className || ""
      }`}
      initial="collapsed"
      animate={shouldExpand ? "expanded" : "collapsed"}
      variants={variants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {children}
    </motion.div>
  )
}

export function ExpandableCardHeader({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`p-4 ${className || ""}`}>
      {children}
    </div>
  )
}

export function ExpandableCardContent({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`p-4 ${className || ""}`}>
      {children}
    </div>
  )
}

export function ExpandableCardFooter({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`p-4 mt-auto border-t ${className || ""}`}>
      {children}
    </div>
  )
}

interface ExpandableContentProps {
  children: React.ReactNode
  preset?: "fade" | "slide-up" | "slide-down" | "blur-sm" | "blur-md"
  keepMounted?: boolean
  stagger?: boolean
  staggerChildren?: number
  animateIn?: MotionProps
}

export function ExpandableContent({
  children,
  preset = "fade",
  keepMounted = false,
  stagger = false,
  staggerChildren = 0.1,
  animateIn,
}: ExpandableContentProps) {
  const context = React.useContext(ExpandableContext)
  if (!context) throw new Error("ExpandableContent must be used within Expandable")

  const { isExpanded } = context

  const presetVariants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    "slide-up": {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
    "slide-down": {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
    "blur-sm": {
      initial: { opacity: 0, filter: "blur(4px)" },
      animate: { opacity: 1, filter: "blur(0px)" },
      exit: { opacity: 0, filter: "blur(4px)" },
    },
    "blur-md": {
      initial: { opacity: 0, filter: "blur(8px)" },
      animate: { opacity: 1, filter: "blur(0px)" },
      exit: { opacity: 0, filter: "blur(8px)" },
    },
  }

  const variants = animateIn || presetVariants[preset]

  if (stagger && React.Children.count(children) > 1) {
    return (
      <AnimatePresence mode="wait">
        {(isExpanded || keepMounted) && (
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{
              animate: {
                transition: {
                  staggerChildren,
                },
              },
            }}
          >
            {React.Children.map(children, (child) => (
              <motion.div variants={variants}>{child}</motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence mode="wait">
      {(isExpanded || keepMounted) && (
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
