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

  /* =========================
     Phone Formatter (Jordan)
     ========================= */
  const formatToJordanNumber = (phone: string) => {
    let cleaned = phone.replace(/\D/g, "");

    // إذا بلش بـ 0 → نشيله ونضيف 962
    if (cleaned.startsWith("0")) {
      cleaned = "962" + cleaned.substring(1);
    }

    // إذا بلش بـ 7 → نضيف 962
    if (cleaned.startsWith("7")) {
      cleaned = "962" + cleaned;
    }

    // إذا بلش بـ 962 أصلاً → تمام
    return cleaned;
  };

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
      const statusName =
        statuses.find((s) => s.StatusID === statusId)?.StatusName || "";
      onStatusUpdated(statusId, statusName);
      onClose();
    }

    setUpdating(false);
  };

  const whatsappNumber = formatToJordanNumber(order.phoneNumber);

  const whatsappMessage = encodeURIComponent(
    `السلام عليكم ${order.studentName}
بخصوص طلب الدوسية رقم (${order.orderID})

- المادة: ${order.course}
- الجامعة: ${order.university}
- الكمية: ${order.quantity}

نحن جاهزون لأي استفسار`
  );

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
            <span className="font-medium text-gray-900 dark:text-white">
              {order.studentName}
            </span>
          </div>

          <div className="flex justify-between items-center border-b border-gray-200 dark:border-white/10 pb-2">
            <span className="text-gray-500">الهاتف</span>
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-900 dark:text-white">
                {order.phoneNumber}
              </span>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#10B956] text-white rounded-full hover:bg-[#0fa24c] transition-colors"
                title="تواصل عبر واتساب"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex justify-between border-b border-gray-200 dark:border-white/10 pb-2">
            <span className="text-gray-500">الجامعة</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {order.university}
            </span>
          </div>

          <div className="flex justify-between border-b border-gray-200 dark:border-white/10 pb-2">
            <span className="text-gray-500">المادة</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {order.course}
            </span>
          </div>

          <div className="flex justify-between border-b border-gray-200 dark:border-white/10 pb-2">
            <span className="text-gray-500">الكمية</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {order.quantity}
            </span>
          </div>

          <div className="flex justify-between border-b border-gray-200 dark:border-white/10 pb-2">
            <span className="text-gray-500">الحالة الحالية</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {order.status}
            </span>
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
                  ${
                    status.StatusID === order.statusID
                      ? "bg-[#10B956] text-white cursor-default"
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
