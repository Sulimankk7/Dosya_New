"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import AdminNavbar from "../components/AdminNavbar";
import FiltersBar from "./FiltersBar";
import OrdersTable from "./OrdersTable";
import type { OrderStatus, University } from "@/lib/database.types";

export default function AdminOrdersPage() {
  const supabase = createClient();

  // ===============================
  // States
  // ===============================
  const [statuses, setStatuses] = useState<OrderStatus[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [filters, setFilters] = useState<{
    statusId: number | null;
    universityId: number | null;
  }>({
    statusId: null,
    universityId: null,
  });

  // ===============================
  // Fetch order statuses from Supabase
  // ===============================
  useEffect(() => {
    const fetchStatuses = async () => {
      const { data, error } = await supabase
        .from("OrderStatuses")
        .select("*");

      if (error) {
        console.error("Failed to fetch statuses", error);
        return;
      }

      setStatuses(data || []);
    };

    fetchStatuses();
  }, []);

  // ===============================
  // Fetch universities from Supabase
  // ===============================
  useEffect(() => {
    const fetchUniversities = async () => {
      const { data, error } = await supabase
        .from("Universities")
        .select("*");

      if (error) {
        console.error("Failed to fetch universities", error);
        return;
      }

      setUniversities(data || []);
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
