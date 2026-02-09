"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { OrderStatus } from "@/lib/database.types";

type Order = {
  orderID: number;
  studentName: string;
  phoneNumber: string;
  university: string;
  course: string;
  status: string;
  statusID: number;
  quantity: number;
};

type Props = {
  order: Order;
  statuses: OrderStatus[];
  onClose: () => void;
  onStatusUpdated: (statusId: number, statusName: string) => void;
};

export default function OrderDrawer({
  order,
  statuses,
  onClose,
  onStatusUpdated,
}: Props) {
  const supabase = createClient();
  const [updating, setUpdating] = useState(false);

  const updateStatus = async (statusId: number) => {
    setUpdating(true);

    const { error } = await supabase
      .from("Orders")
      .update({ StatusID: statusId })
      .eq("OrderID", order.orderID);

    if (error) {
      console.error("Failed to update status", error);
      alert("فشل تحديث الحالة");
    } else {
      const statusName = statuses.find((s) => s.StatusID === statusId)?.StatusName || "";
      onStatusUpdated(statusId, statusName);
      onClose();
    }

    setUpdating(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#0B1220] rounded-2xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-6 text-right text-gray-900 dark:text-white">
          تفاصيل الطلب #{order.orderID}
        </h2>

        <div className="space-y-4 text-right text-gray-700 dark:text-gray-300">
          <div className="flex justify-between border-b border-gray-200 dark:border-white/10 pb-2">
            <span className="text-gray-500">الاسم</span>
            <span className="font-medium text-gray-900 dark:text-white">{order.studentName}</span>
          </div>

          <div className="flex justify-between items-center border-b border-gray-200 dark:border-white/10 pb-2">
            <span className="text-gray-500">الهاتف</span>
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-900 dark:text-white">{order.phoneNumber}</span>
              <a
                href={`https://wa.me/${order.phoneNumber.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#10B956] text-white rounded-full hover:bg-[#0e9d49] transition-colors"
                title="تواصل عبر واتساب"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex justify-between border-b border-gray-200 dark:border-white/10 pb-2">
            <span className="text-gray-500">الجامعة</span>
            <span className="font-medium text-gray-900 dark:text-white">{order.university}</span>
          </div>

          <div className="flex justify-between border-b border-gray-200 dark:border-white/10 pb-2">
            <span className="text-gray-500">المادة</span>
            <span className="font-medium text-gray-900 dark:text-white">{order.course}</span>
          </div>

          <div className="flex justify-between border-b border-gray-200 dark:border-white/10 pb-2">
            <span className="text-gray-500">الكمية</span>
            <span className="font-medium text-gray-900 dark:text-white">{order.quantity}</span>
          </div>

          <div className="flex justify-between border-b border-gray-200 dark:border-white/10 pb-2">
            <span className="text-gray-500">الحالة الحالية</span>
            <span className="font-medium text-gray-900 dark:text-white">{order.status}</span>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold mb-3 text-right text-gray-700 dark:text-gray-300">
            تغيير الحالة
          </h3>

          <div className="flex flex-wrap gap-2 justify-end">
            {statuses.map((status) => (
              <button
                key={status.StatusID}
                disabled={updating || status.StatusID === order.statusID}
                onClick={() => updateStatus(status.StatusID)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition
                  ${status.StatusID === order.statusID
                    ? "bg-green-500 text-white cursor-default"
                    : "bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white"
                  }
                  disabled:opacity-50
                `}
              >
                {status.StatusName}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
