"use client";

import { useEffect, useState } from "react";
import orderService from "@/api/OrderService";

// Read-only data used only on the account dashboard — not shared/mutated
// elsewhere in the app, so a plain hook is enough; no Redux slice needed.
export function useOrders(enabled) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    orderService.getMyOrders().then((data) => {
      if (!cancelled) setOrders(data);
    });
    return () => {
      cancelled = true;
    };
  }, [enabled]);

  return orders;
}
