"use client"

import React, { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Battery,
  Bluetooth,
  Calendar,
  Clock,
  Cloud,
  Droplets,
  Fingerprint,
  MapPin,
  MessageSquare,
  Mic,
  ShoppingCart,
  Star,
  Sun,
  Users,
  Video,
  Wind,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Expandable,
  ExpandableCard,
  ExpandableCardContent,
  ExpandableCardFooter,
  ExpandableCardHeader,
  ExpandableContent,
  ExpandableTrigger,
} from "@/components/ui/expandable"

// Example components
export function DesignSyncExample() {
  return (
    <Expandable
      expandDirection="both"
      expandBehavior="replace"
      initialDelay={0.2}
      onExpandStart={() => console.log("Expanding meeting card...")}
      onExpandEnd={() => console.log("Meeting card expanded!")}
    >
      {({ isExpanded }) => (
        <ExpandableTrigger>
          <ExpandableCard
            className="w-full relative"
            collapsedSize={{ width: 320, height: 240 }}
            expandedSize={{ width: 420, height: 480 }}
            hoverToExpand={false}
            expandDelay={200}
            collapseDelay={500}
          >
            <ExpandableCardHeader>
              <div className="flex justify-between items-start w-full">
                <div>
                  <Badge
                    variant="secondary"
                    className="bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-100 mb-2"
                  >
                    In 15 mins
                  </Badge>
                  <h3 className="font-semibold text-xl text-gray-800 dark:text-white">
                    Design Sync
                  </h3>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="icon" variant="outline" className="h-8 w-8">
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add to Calendar</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </ExpandableCardHeader>
            <!-- Rest of the DesignSyncExample component -->
          </ExpandableCard>
        </ExpandableTrigger>
      )}
    </Expandable>
  )
}

export function ProductShowcaseCard() {
  // ProductShowcaseCard implementation
}

export function WeatherForecastCard() {
  // WeatherForecastCard implementation
}

export function ControlledExpandableCard() {
  // ControlledExpandableCard implementation
}

export function ExpandableCardExamples() {
  return (
    <div className="p-8 w-full max-w-7xl mx-auto space-y-12">
      <div className="flex flex-col items-center space-y-24">
        <div className="min-h-[480px]">
          <DesignSyncExample />
        </div>
        <div className="flex gap-24 min-h-[600px]">
          <ProductShowcaseCard />
          <WeatherForecastCard />
        </div>
      </div>
    </div>
  )
}
