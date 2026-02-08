"use client";

import { useState } from "react";

type FiltersBarProps = {
  statuses: {
    statusID: number;
    statusName: string;
  }[];
  universities: {
    universityID: number;
    universityName: string;
  }[];
  setFilters: React.Dispatch<
    React.SetStateAction<{
      statusId: number | null;
      universityId: number | null;
    }>
  >;
};

export default function FiltersBar({
  statuses,
  universities,
  setFilters,
}: FiltersBarProps) {
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
  const [selectedUniversity, setSelectedUniversity] =
    useState<number | null>(null);

  return (
    <div
      className="bg-[#0B1220] border border-white/10 rounded-xl p-4
                 flex flex-col sm:flex-row gap-4 items-end"
    >
      <div className="w-full sm:flex-1">
        <label className="block mb-1 text-sm text-right">
          حالة الطلب
        </label>
        <select
          onChange={(e) =>
            setSelectedStatus(
              e.target.value ? Number(e.target.value) : null
            )
          }
          className="w-full bg-[#050A18] border border-white/10 rounded-lg px-3 py-2"
        >
          <option value="">جميع الحالات</option>
          {statuses.map((status) => (
            <option key={status.statusID} value={status.statusID}>
              {status.statusName}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full sm:flex-1">
        <label className="block mb-1 text-sm text-right">
          الجامعة
        </label>
        <select
          onChange={(e) =>
            setSelectedUniversity(
              e.target.value ? Number(e.target.value) : null
            )
          }
          className="w-full bg-[#050A18] border border-white/10 rounded-lg px-3 py-2"
        >
          <option value="">جميع الجامعات</option>
          {universities.map((uni) => (
            <option key={uni.universityID} value={uni.universityID}>
              {uni.universityName}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={() =>
          setFilters({
            statusId: selectedStatus,
            universityId: selectedUniversity,
          })
        }
        className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-2 rounded-lg"
      >
        فلترة
      </button>
    </div>
  );
}
