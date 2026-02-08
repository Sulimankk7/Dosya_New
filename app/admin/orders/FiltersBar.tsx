"use client";

import { useState } from "react";
import type { OrderStatus, University } from "@/lib/database.types";

type Filters = { statusId: number | null; universityId: number | null };

type Props = {
  statuses: OrderStatus[];
  universities: University[];
  setFilters: (filters: Filters) => void;
};

export default function FiltersBar({
  statuses,
  universities,
  setFilters,
}: Props) {
  const [localFilters, setLocalFilters] = useState<Filters>({
    statusId: null,
    universityId: null,
  });

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const newFilters = {
      ...localFilters,
      statusId: value ? Number(value) : null,
    };
    setLocalFilters(newFilters);
    setFilters(newFilters);
  };

  const handleUniversityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const newFilters = {
      ...localFilters,
      universityId: value ? Number(value) : null,
    };
    setLocalFilters(newFilters);
    setFilters(newFilters);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
      <select
        onChange={handleStatusChange}
        className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-[#0B1220] text-gray-900 dark:text-white"
      >
        <option value="">جميع الحالات</option>
        {statuses.map((status) => (
          <option key={status.StatusID} value={status.StatusID}>
            {status.StatusName}
          </option>
        ))}
      </select>

      <select
        onChange={handleUniversityChange}
        className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-[#0B1220] text-gray-900 dark:text-white"
      >
        <option value="">جميع الجامعات</option>
        {universities.map((uni) => (
          <option key={uni.UniversityID} value={uni.UniversityID}>
            {uni.UniversityName}
          </option>
        ))}
      </select>
    </div>
  );
}
