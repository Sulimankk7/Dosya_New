"use client";

import { useState } from "react";
import toast from "react-hot-toast";

type OrderDrawerProps = {
  order: any;
  statuses: {
    statusID: number;
    statusName: string;
  }[];
  onClose: () => void;
  onStatusUpdated: (statusId: number, statusName: string) => void;
};

export default function OrderDrawer({
  order,
  statuses,
  onClose,
  onStatusUpdated,
}: OrderDrawerProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const message = `السلام عليكم ${order.studentName}
بخصوص طلب الدوسية رقم (${order.orderID})

- المادة: ${order.course}
- الجامعة: ${order.university}
- الكمية: ${order.quantity}

نحن جاهزون لأي استفسار`;

  const whatsappLink = `https://wa.me/962${order.phoneNumber.substring(
    1
  )}?text=${encodeURIComponent(message)}`;

  const updateStatus = async (statusId: number) => {
    try {
      setIsUpdating(true);

      const res = await fetch(
        `http://localhost:5217/api/admin/orders/${order.orderID}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ statusID: statusId }),
        }
      );

      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }

      if (!res.ok) throw new Error();

      const statusName =
        statuses.find((s) => s.statusID === statusId)?.statusName || "";

      onStatusUpdated(statusId, statusName);
      toast.success("تم تحديث حالة الطلب");
    } catch {
      toast.error("حدث خطأ أثناء تحديث الحالة");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div onClick={onClose} className="flex-1 bg-black/60" />

      {/* Drawer */}
      <div
        className="w-full sm:w-[380px]
                   bg-[#0B1220]
                   border-l border-white/10
                   p-5 text-white
                   animate-slide-in overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">تفاصيل الطلب</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 text-sm">
          <Info label="رقم الطلب" value={order.orderID} />
          <Info label="الاسم" value={order.studentName} />
          <Info label="رقم الهاتف" value={order.phoneNumber} />
          <Info label="الجامعة" value={order.university} />
          <Info label="المادة" value={order.course} />
          <Info label="الكمية" value={order.quantity} />
          <Info label="الحالة الحالية" value={order.status} />
        </div>

        <div className="mt-6">
          <label className="block mb-2 text-sm">تغيير الحالة</label>
          <select
            defaultValue={order.statusID}
            disabled={isUpdating}
            onChange={(e) => updateStatus(Number(e.target.value))}
            className="w-full bg-[#050A18] border border-white/10 rounded-lg px-3 py-2"
          >
            {statuses.map((status) => (
              <option key={status.statusID} value={status.statusID}>
                {status.statusName}
              </option>
            ))}
          </select>

          {isUpdating && (
            <p className="mt-2 text-xs text-white/50">
              جارٍ تحديث الحالة...
            </p>
          )}
        </div>

        <a
          href={whatsappLink}
          target="_blank"
          className="block mt-6 text-center bg-green-500 hover:bg-green-600 text-black font-semibold py-3 rounded-lg"
        >
          التواصل عبر واتساب
        </a>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex justify-between border-b border-white/10 pb-2">
      <span className="text-white/60">{label}</span>
      <span>{value}</span>
    </div>
  );
}
