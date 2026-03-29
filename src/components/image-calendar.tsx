"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DayCount {
  date: string;
  count: number;
}

interface ImageCalendarProps {
  year: number;
  month: number;
  days: DayCount[];
  projectId: string;
  deviceId: string;
}

const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function ImageCalendar({
  year,
  month,
  days,
  projectId,
  deviceId,
}: ImageCalendarProps) {
  const router = useRouter();

  const countMap = new Map(days.map((d) => [d.date, d.count]));

  // Build calendar grid
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const daysInMonth = lastDay.getDate();

  // Monday = 0, Sunday = 6
  let startDow = firstDay.getDay() - 1;
  if (startDow < 0) startDow = 6;

  const cells: Array<{ day: number | null; date: string | null }> = [];

  // Padding before first day
  for (let i = 0; i < startDow; i++) {
    cells.push({ day: null, date: null });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    cells.push({ day: d, date: dateStr });
  }

  const monthName = firstDay.toLocaleDateString("en-AU", { month: "long" });

  function navigateMonth(delta: number) {
    let newMonth = month + delta;
    let newYear = year;
    if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    } else if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }
    const monthStr = `${newYear}-${String(newMonth).padStart(2, "0")}`;
    router.push(
      `/projects/${projectId}/cameras/${deviceId}?month=${monthStr}`
    );
  }

  function handleDayClick(date: string) {
    router.push(
      `/projects/${projectId}/cameras/${deviceId}?date=${date}`
    );
  }

  return (
    <div>
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="icon" onClick={() => navigateMonth(-1)}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h3 className="text-lg font-semibold">
          {monthName} {year}
        </h3>
        <Button variant="ghost" size="icon" onClick={() => navigateMonth(1)}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAY_NAMES.map((name) => (
          <div
            key={name}
            className="text-center text-xs font-medium text-muted-foreground py-1"
          >
            {name}
          </div>
        ))}
      </div>

      {/* Calendar cells */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, i) => {
          if (cell.day === null) {
            return <div key={`empty-${i}`} className="h-16" />;
          }

          const count = cell.date ? countMap.get(cell.date) ?? 0 : 0;
          const hasImages = count > 0;
          const isLowCount = count > 0 && count < 6;

          return (
            <button
              key={cell.date}
              onClick={() => cell.date && handleDayClick(cell.date)}
              className={cn(
                "h-16 rounded-md border text-sm flex flex-col items-center justify-center gap-0.5 transition-colors",
                hasImages
                  ? "border-blue-200 bg-blue-50 hover:bg-blue-100 cursor-pointer"
                  : "border-zinc-100 bg-white",
                count === 0 &&
                  cell.date &&
                  new Date(cell.date) < new Date() &&
                  "border-red-100 bg-red-50",
                isLowCount && "border-yellow-200 bg-yellow-50 hover:bg-yellow-100"
              )}
            >
              <span className="text-xs text-muted-foreground">{cell.day}</span>
              {hasImages && (
                <span className="text-sm font-semibold text-blue-700">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
