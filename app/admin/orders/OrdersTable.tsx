"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import OrderDrawer from "./OrderDrawer";
import type { OrderStatus } from "@/lib/database.types";

function getStatusClassById(statusId: number) {
  switch (statusId) {
    case 1:
      return "bg-yellow-500/20 text-yellow-400";
    case 3:
      return "bg-green-500/20 text-green-400";
    case 4:
      return "bg-red-500/20 text-red-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
}

type OrdersTableProps = {
  filters: {
    statusId: number | null;
    universityId: number | null;
  };
  statuses: OrderStatus[];
};

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

const PAGE_SIZE = 10;

export default function OrdersTable({
  filters,
  statuses,
}: OrdersTableProps) {
  const supabase = createClient();
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setUnauthorized(false);
      setCurrentPage(1); // reset pagination on filter

      try {
        // Check if user is authenticated
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          setUnauthorized(true);
          router.push("/admin/login");
          return;
        }

        // Build query with joins
        let query = supabase
          .from("Orders")
          .select(`
            OrderID,
            Quantity,
            StatusID,
            Students!inner(FullName, PhoneNumber),
            Universities!inner(UniversityName),
            Courses!inner(CourseName),
            OrderStatuses!inner(StatusName)
          `)
          .order("OrderID", { ascending: false });

        if (filters.statusId !== null) {
          query = query.eq("StatusID", filters.statusId);
        }
        if (filters.universityId !== null) {
          query = query.eq("UniversityID", filters.universityId);
        }

        const { data, error } = await query;

        if (error) {
          console.error("Failed to fetch orders", error);
          return;
        }

        // Transform data to match expected format
        const transformedOrders: Order[] = (data || []).map((order: any) => ({
          orderID: order.OrderID,
          studentName: order.Students?.FullName || "",
          phoneNumber: order.Students?.PhoneNumber || "",
          university: order.Universities?.UniversityName || "",
          course: order.Courses?.CourseName || "",
          status: order.OrderStatuses?.StatusName || "",
          statusID: order.StatusID,
          quantity: order.Quantity,
        }));

        setOrders(transformedOrders);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [filters]);

  if (loading) {
    return (
      <p className="text-center text-gray-400">جاري التحميل...</p>
    );
  }

  if (unauthorized) {
    return (
      <p className="text-center text-red-500">
        انتهت الجلسة، الرجاء تسجيل الدخول مرة أخرى
      </p>
    );
  }

  if (orders.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-white/60">
        لا يوجد طلبات
      </p>
    );
  }

  // ===============================
  // Pagination logic
  // ===============================
  const totalPages = Math.ceil(orders.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedOrders = orders.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  return (
    <>
      <div className="overflow-x-auto">
        <div className="min-w-[900px] bg-white dark:bg-[#0B1220] border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-right text-sm">
            <thead className="bg-gray-100 dark:bg-white/5">
              <tr>
                <th className="p-3">ID</th>
                <th>الاسم</th>
                <th>رقم الهاتف</th>
                <th>الجامعة</th>
                <th>المادة</th>
                <th>الكمية</th>
                <th>الحالة</th>
                <th>إجراء</th>
              </tr>
            </thead>

            <tbody>
              {paginatedOrders.map((order) => (
                <tr
                  key={order.orderID}
                  className="border-t border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5"
                >
                  <td className="p-3">{order.orderID}</td>
                  <td>{order.studentName}</td>
                  <td>{order.phoneNumber}</td>
                  <td>{order.university}</td>
                  <td>{order.course}</td>
                  <td className="text-center font-semibold">
                    {order.quantity}
                  </td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClassById(
                        order.statusID
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-green-500 hover:underline"
                    >
                      عرض
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= Pagination UI ================= */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 rounded-lg border border-white/10 disabled:opacity-40"
          >
            السابق
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg text-sm
                  ${currentPage === page
                    ? "bg-green-500 text-black"
                    : "border border-white/10 hover:bg-white/5"
                  }`}
              >
                {page}
              </button>
            );
          })}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 rounded-lg border border-white/10 disabled:opacity-40"
          >
            التالي
          </button>
        </div>
      )}

      {selectedOrder && (
        <OrderDrawer
          order={selectedOrder}
          statuses={statuses}
          onClose={() => setSelectedOrder(null)}
          onStatusUpdated={(statusId, statusName) => {
            setOrders((prev) =>
              prev.map((o) =>
                o.orderID === selectedOrder.orderID
                  ? { ...o, statusID: statusId, status: statusName }
                  : o
              )
            );
          }}
        />
      )}
    </>
  );
}
