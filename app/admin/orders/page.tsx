"use client";

import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import FiltersBar from "./FiltersBar";
import OrdersTable from "./OrdersTable";

export default function AdminOrdersPage() {
  // ===============================
  // States
  // ===============================
  const [statuses, setStatuses] = useState<any[]>([]);
  const [universities, setUniversities] = useState<any[]>([]);
  const [filters, setFilters] = useState<{
    statusId: number | null;
    universityId: number | null;
  }>({
    statusId: null,
    universityId: null,
  });

  // ===============================
  // Fetch order statuses (ADMIN)
  // ===============================
  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const res = await fetch(
          "http://localhost:5217/api/admin/order-statuses",
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          console.error("Failed to fetch statuses");
          return;
        }

        const data = await res.json();
        setStatuses(data);
      } catch (error) {
        console.error("Failed to fetch statuses", error);
      }
    };

    fetchStatuses();
  }, []);

  // ===============================
  // Fetch universities (PUBLIC)
  // ===============================
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const res = await fetch(
          "http://localhost:5217/api/universities",
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          console.error("Failed to fetch universities");
          return;
        }

        const data = await res.json();
        setUniversities(data);
      } catch (error) {
        console.error("Failed to fetch universities", error);
      }
    };

    fetchUniversities();
  }, []);

  // ===============================
  // UI
  // ===============================
  return (
    <>
      <AdminNavbar />

      <div
        className="min-h-screen
                   bg-gradient-to-b from-[#070B16] to-[#020617]
                   text-white
                   px-4 sm:px-6 lg:px-8
                   py-4 sm:py-6"
      >
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-right">
          الطلبات
        </h1>

        <FiltersBar
          statuses={statuses}
          universities={universities}
          setFilters={setFilters}
        />

        <div className="mt-4 sm:mt-6">
          <OrdersTable
            filters={filters}
            statuses={statuses}
          />
        </div>
      </div>
    </>
  );
}
