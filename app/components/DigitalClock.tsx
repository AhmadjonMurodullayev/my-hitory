"use client"

import { useState, useEffect } from "react"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type DatePosition = "above" | "below" | "hidden"

export default function DigitalClock() {
  const [time, setTime] = useState(new Date())
  const [datePosition, setDatePosition] = useState<DatePosition>("below")

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    // Load date position preference
    const savedPosition = localStorage.getItem("datePosition") as DatePosition
    if (savedPosition) {
      setDatePosition(savedPosition)
    }

    return () => {
      clearInterval(timer)
    }
  }, [])

  const updateDatePosition = (position: DatePosition) => {
    setDatePosition(position)
    localStorage.setItem("datePosition", position)
  }

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
    const seconds = date.getSeconds().toString().padStart(2, "0")
    return `${hours}:${minutes}:${seconds}`
  }

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    return date.toLocaleDateString('en-US', options)
  }

  return (
    <div className="relative text-6xl font-bold text-primary bg-transparent p-4 font-mono">
      <div className="absolute top-0 right-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary/20 hover:bg-transparent hover:text-primary/50 w-8 h-8 opacity-40 hover:opacity-100 transition-opacity"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-background border-primary/30">
            <DropdownMenuLabel className="text-primary/70">Date Display</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-primary/20" />
            <DropdownMenuItem className="text-primary/70 cursor-pointer" onClick={() => updateDatePosition("above")}>
              Above Time
            </DropdownMenuItem>
            <DropdownMenuItem className="text-primary/70 cursor-pointer" onClick={() => updateDatePosition("below")}>
              Below Time
            </DropdownMenuItem>
            <DropdownMenuItem className="text-primary/70 cursor-pointer" onClick={() => updateDatePosition("hidden")}>
              Hidden
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col items-center">
        {datePosition === "above" && <div className="text-lg mb-2 text-primary/60">{formatDate(time)}</div>}
        <div>{formatTime(time)}</div>
        {datePosition === "below" && <div className="text-lg mt-2 text-primary/60">{formatDate(time)}</div>}
      </div>
    </div>
  )
}