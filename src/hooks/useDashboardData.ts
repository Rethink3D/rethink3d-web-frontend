import { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "../context/useAuth";
import { makerService } from "../services/makerService";
import { orderService } from "../services/orderService";
import { userService } from "../services/userService";
import { customRequestService } from "../services/customRequestService";
import type {
  OrderPreviewDTO,
  CustomRequestDTO,
  UserProfileDTO,
} from "../types/dtos";

export interface DashboardStats {
  activeOrders: number;
  totalProducts: number;
  pendingRequests: number;
  totalSales: number;
}

export const useDashboardData = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfileDTO | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    activeOrders: 0,
    totalProducts: 0,
    pendingRequests: 0,
    totalSales: 0,
  });

  const [recentOrders, setRecentOrders] = useState<OrderPreviewDTO[]>([]);
  const [recentRequests, setRecentRequests] = useState<CustomRequestDTO[]>([]);

  const fetchDashboardData = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);

      const userProfile = await userService.getProfile();
      setProfile(userProfile);

      const makerId = userProfile.makerId;

      const [orders, requests, makerData] = await Promise.all([
        orderService.getMakerOrders(),
        customRequestService.getMakerRequests(),
        makerId ? makerService.getMakerById(makerId) : Promise.resolve(null),
      ]);

      
      const validOrders = orders.filter(
        (o) => o.id && o.status && o.creationTime,
      );

      
      const activeOrdersList = validOrders.filter((o) =>
        [
          "awaiting_maker",
          "on_going",
          "delayed",
          "new_deadline",
          "ready",
          "awaiting_confirmation",
        ].includes(o.status),
      );

      
      const sortedOrders = activeOrdersList.sort((a, b) => {
        
        if (a.status === "delayed" && b.status !== "delayed") return -1;
        if (a.status !== "delayed" && b.status === "delayed") return 1;

        
        return (
          new Date(b.creationTime).getTime() -
          new Date(a.creationTime).getTime()
        );
      });

      setRecentOrders(sortedOrders.slice(0, 5));
      const openRequests = requests.slice(0, 3);
      setRecentRequests(openRequests);

      const productCount = makerData?.products?.length || 0;

      setStats({
        activeOrders: activeOrdersList.length,
        totalProducts: productCount,
        pendingRequests: requests.length,
        totalSales: 0,
      });
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return useMemo(
    () => ({
      profile,
      stats,
      recentOrders,
      recentRequests,
      loading,
      refresh: fetchDashboardData,
    }),
    [profile, stats, recentOrders, recentRequests, loading, fetchDashboardData],
  );
};
