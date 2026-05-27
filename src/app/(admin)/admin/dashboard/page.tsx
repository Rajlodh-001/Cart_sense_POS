"use client";
import React, { useState, useMemo } from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Calendar,
  ShoppingBag,
  Clock,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Banknote,
  QrCode,
  RefreshCw,
  ArrowRight,
  Loader2,
  Users,
  Activity,
  Layers
} from "lucide-react";
import AdminPageLayout from "@/components/shared/AdminPageLayout";
import { useOrders } from "@/hooks/useOrders";
import { useDevices } from "@/hooks/useAuth";

export default function DashboardPage() {
  const [filterRange, setFilterRange] = useState<"today" | "yesterday" | "7days">("today");
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("all");

  // Fetch 100 most recent orders of the active location
  const { data: ordersData, isLoading, refetch, isRefetching } = useOrders({ limit: 100 });
  const orders = ordersData?.data || [];
  const { data: devices } = useDevices();

  // Filter orders by time range and selected device
  const filteredOrders = useMemo(() => {
    if (!orders.length) return [];

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    const yesterdayEnd = new Date(todayStart);
    yesterdayEnd.setMilliseconds(-1);

    const sevenDaysAgo = new Date(todayStart);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return orders.filter((o) => {
      const orderDate = new Date(o.orderTime);
      let matchesTime = false;
      if (filterRange === "today") {
        matchesTime = orderDate >= todayStart;
      } else if (filterRange === "yesterday") {
        matchesTime = orderDate >= yesterdayStart && orderDate <= yesterdayEnd;
      } else {
        matchesTime = orderDate >= sevenDaysAgo;
      }

      const matchesDevice = selectedDeviceId === "all" || o.deviceId === selectedDeviceId;

      return matchesTime && matchesDevice;
    });
  }, [orders, filterRange, selectedDeviceId]);

  // Calculate statistics for the previous comparative period
  const comparisonStats = useMemo(() => {
    if (!orders.length) return { revenue: 0, ordersCount: 0, aov: 0, itemsSold: 0 };

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    let prevStart: Date;
    let prevEnd: Date;

    if (filterRange === "today") {
      prevStart = new Date(todayStart);
      prevStart.setDate(prevStart.getDate() - 1);
      prevEnd = new Date(todayStart);
      prevEnd.setMilliseconds(-1);
    } else if (filterRange === "yesterday") {
      prevStart = new Date(todayStart);
      prevStart.setDate(prevStart.getDate() - 2);
      prevEnd = new Date(todayStart);
      prevEnd.setDate(prevEnd.getDate() - 1);
      prevEnd.setMilliseconds(-1);
    } else {
      prevStart = new Date(todayStart);
      prevStart.setDate(prevStart.getDate() - 14);
      prevEnd = new Date(todayStart);
      prevEnd.setDate(prevEnd.getDate() - 7);
      prevEnd.setMilliseconds(-1);
    }

    const prevOrders = orders.filter((o) => {
      const orderDate = new Date(o.orderTime);
      return orderDate >= prevStart && orderDate <= prevEnd;
    });

    const prevCompleted = prevOrders.filter((o) => o.status === "COMPLETED");
    const prevRevenue = prevCompleted.reduce((sum, o) => sum + Number(o.totalAmount || 0), 0);
    const prevOrdersCount = prevOrders.length;
    const prevAov = prevCompleted.length > 0 ? prevRevenue / prevCompleted.length : 0;
    const prevItemsSold = prevCompleted.reduce(
      (sum, o) =>
        sum +
        (o.items?.reduce((iSum: number, item: any) => iSum + (item.quantity || 0), 0) || 0),
      0
    );

    return {
      revenue: prevRevenue,
      ordersCount: prevOrdersCount,
      aov: prevAov,
      itemsSold: prevItemsSold,
    };
  }, [orders, filterRange]);

  // Active metrics calculations
  const stats = useMemo(() => {
    const completedOrders = filteredOrders.filter((o) => o.status === "COMPLETED");
    const totalOrdersCount = filteredOrders.length;
    const completedOrdersCount = completedOrders.length;

    const grossRevenue = completedOrders.reduce((sum, o) => sum + Number(o.totalAmount || 0), 0);
    const aov = completedOrdersCount > 0 ? grossRevenue / completedOrdersCount : 0;

    const itemsSold = completedOrders.reduce(
      (sum, o) =>
        sum +
        (o.items?.reduce((iSum: number, item: any) => iSum + (item.quantity || 0), 0) || 0),
      0
    );

    const getPercentChange = (curr: number, prev: number) => {
      if (prev === 0) return curr > 0 ? 100 : 0;
      return Math.round(((curr - prev) / prev) * 100);
    };

    return {
      grossRevenue,
      revenueChange: getPercentChange(grossRevenue, comparisonStats.revenue),
      totalOrders: totalOrdersCount,
      ordersChange: getPercentChange(totalOrdersCount, comparisonStats.ordersCount),
      aov,
      aovChange: getPercentChange(aov, comparisonStats.aov),
      itemsSold,
      itemsChange: getPercentChange(itemsSold, comparisonStats.itemsSold),
    };
  }, [filteredOrders, comparisonStats]);

  // Hourly Sales Data
  const hourlyData = useMemo(() => {
    const blocks = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"];
    const sales = new Array(blocks.length).fill(0);

    filteredOrders
      .filter((o) => o.status === "COMPLETED")
      .forEach((o) => {
        const date = new Date(o.orderTime);
        const hour = date.getHours();

        if (hour >= 8 && hour < 10) sales[0] += Number(o.totalAmount || 0);
        else if (hour >= 10 && hour < 12) sales[1] += Number(o.totalAmount || 0);
        else if (hour >= 12 && hour < 14) sales[2] += Number(o.totalAmount || 0);
        else if (hour >= 14 && hour < 16) sales[3] += Number(o.totalAmount || 0);
        else if (hour >= 16 && hour < 18) sales[4] += Number(o.totalAmount || 0);
        else if (hour >= 18 && hour < 20) sales[5] += Number(o.totalAmount || 0);
        else if (hour >= 20 && hour < 22) sales[6] += Number(o.totalAmount || 0);
        else sales[7] += Number(o.totalAmount || 0);
      });

    return blocks.map((label, index) => ({
      label,
      value: sales[index],
    }));
  }, [filteredOrders]);

  const maxSalesValue = useMemo(() => {
    return Math.max(...hourlyData.map((d) => d.value), 100);
  }, [hourlyData]);

  // Top Selling Products
  const topProducts = useMemo(() => {
    const productSales: Record<string, { name: string; quantity: number; revenue: number }> = {};

    filteredOrders
      .filter((o) => o.status === "COMPLETED")
      .forEach((o) => {
        o.items?.forEach((item: any) => {
          const name = item.name || "Unknown Product";
          if (!productSales[name]) {
            productSales[name] = { name, quantity: 0, revenue: 0 };
          }
          productSales[name].quantity += item.quantity || 0;
          productSales[name].revenue += Number(item.total || 0);
        });
      });

    return Object.values(productSales)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 4);
  }, [filteredOrders]);

  const maxProductQty = useMemo(() => {
    return Math.max(...topProducts.map((p) => p.quantity), 1);
  }, [topProducts]);

  // Payment Methods Distribution
  const paymentStats = useMemo(() => {
    let cash = 0;
    let card = 0;
    let qr = 0;
    let other = 0;

    filteredOrders
      .filter((o) => o.status === "COMPLETED")
      .forEach((o) => {
        const method = o.paymentMethod;
        const amt = Number(o.totalAmount || 0);
        if (method === "CASH") cash += amt;
        else if (method === "CARD") card += amt;
        else if (method === "QR") qr += amt;
        else other += amt;
      });

    const total = cash + card + qr + other || 1;
    return [
      { name: "Cash", amount: cash, percent: Math.round((cash / total) * 100), color: "bg-emerald-500", text: "text-emerald-500", icon: Banknote },
      { name: "Card", amount: card, percent: Math.round((card / total) * 100), color: "bg-blue-500", text: "text-blue-500", icon: CreditCard },
      { name: "QR Code", amount: qr, percent: Math.round((qr / total) * 100), color: "bg-purple-500", text: "text-purple-500", icon: QrCode },
      { name: "Other / Direct", amount: other, percent: Math.round((other / total) * 100), color: "bg-gray-400", text: "text-gray-400", icon: ShoppingBag },
    ];
  }, [filteredOrders]);

  // Order Status Stats
  const statusStats = useMemo(() => {
    let pending = 0;
    let completed = 0;
    let cancelled = 0;

    filteredOrders.forEach((o) => {
      if (o.status === "PENDING") pending++;
      else if (o.status === "COMPLETED") completed++;
      else if (o.status === "CANCELLED") cancelled++;
    });

    return { pending, completed, cancelled };
  }, [filteredOrders]);

  const recentOrders = useMemo(() => {
    return filteredOrders.slice(0, 5);
  }, [filteredOrders]);

  return (
    <AdminPageLayout>
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Admin Dashboard</h2>
          <p className="text-gray-500 font-bold mt-1 text-sm tracking-tight">
            Real-time operations, payment distributions, and register insights.
          </p>
        </div>

        {/* Date Filters, Register Selection, & Refresh Controls */}
        <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
          {/* Register Selector */}
          <div className="flex bg-gray-100/80 p-1.5 rounded-2xl border border-gray-200/50 shadow-sm items-center gap-2">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Register:</span>
            <select
              value={selectedDeviceId}
              onChange={(e) => setSelectedDeviceId(e.target.value)}
              className="bg-transparent text-xs font-black text-gray-700 outline-none pr-2 cursor-pointer uppercase"
            >
              <option value="all">All Registers</option>
              {devices?.map((dev) => (
                <option key={dev.id} value={dev.id}>
                  {dev.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex bg-gray-100/80 p-1.5 rounded-2xl border border-gray-200/50 shadow-sm">
            {[
              { key: "today", label: "Today" },
              { key: "yesterday", label: "Yesterday" },
              { key: "7days", label: "7 Days" },
            ].map((btn) => (
              <button
                key={btn.key}
                onClick={() => setFilterRange(btn.key as any)}
                className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all ${
                  filterRange === btn.key
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => refetch()}
            disabled={isLoading || isRefetching}
            className="p-3 bg-white border border-gray-200/60 rounded-2xl text-gray-400 hover:text-blue-600 hover:border-blue-100 shadow-sm hover:shadow-md transition-all active:scale-95 disabled:opacity-50"
            title="Refresh statistics"
          >
            <RefreshCw size={18} className={isRefetching ? "animate-spin text-blue-500" : ""} />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="py-32 flex flex-col items-center justify-center">
          <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
          <p className="font-black text-gray-400 uppercase text-xs tracking-widest">
            Aggregating Sales Statistics
          </p>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Top 4 Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                label: "Gross Revenue",
                value: `$${stats.grossRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                change: stats.revenueChange,
                icon: TrendingUp,
                color: "blue"
              },
              {
                label: "Total Orders",
                value: stats.totalOrders.toString(),
                change: stats.ordersChange,
                icon: ShoppingBag,
                color: "purple"
              },
              {
                label: "Average Ticket (AOV)",
                value: `$${stats.aov.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                change: stats.aovChange,
                icon: Activity,
                color: "orange"
              },
              {
                label: "Items Sold",
                value: stats.itemsSold.toString(),
                change: stats.itemsChange,
                icon: Layers,
                color: "emerald"
              }
            ].map((card) => {
              const Icon = card.icon;
              const isPositive = card.change >= 0;
              return (
                <div
                  key={card.label}
                  className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-xl hover:shadow-blue-900/5 transition-all"
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-${card.color}-50 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-110`} />
                  <Icon size={20} className={`text-${card.color}-500 mb-4 relative z-10`} />
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-2 mt-2">
                    {card.label}
                  </p>
                  <p className="text-3xl font-black text-gray-900 mb-1">{card.value}</p>
                  <div className="flex items-center gap-1">
                    {isPositive ? (
                      <TrendingUp size={12} className="text-emerald-500" />
                    ) : (
                      <TrendingDown size={12} className="text-red-500" />
                    )}
                    <span className={`text-[10px] font-black ${isPositive ? "text-emerald-500" : "text-red-500"} uppercase`}>
                      {isPositive ? "+" : ""}{card.change}% vs prev. period
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Central Analytics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sales Hourly Graph */}
            <div className="lg:col-span-2 p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Daily Rhythm
                </span>
                <h3 className="text-xl font-black text-gray-900 mt-1 mb-6">Hourly Revenue</h3>
              </div>

              {filteredOrders.filter((o) => o.status === "COMPLETED").length === 0 ? (
                <div className="h-48 flex items-center justify-center border-2 border-dashed border-gray-100 rounded-3xl">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    No completed orders today
                  </p>
                </div>
              ) : (
                <div className="pt-4 overflow-x-auto custom-scrollbar">
                  <div className="min-w-[450px]">
                    <svg className="w-full h-48 overflow-visible" viewBox="0 0 500 200" preserveAspectRatio="none">
                      {hourlyData.map((d, i) => {
                        const x = i * (500 / hourlyData.length) + 12;
                        const barWidth = 32;
                        const barHeight = (d.value / maxSalesValue) * 150;
                        const y = 170 - barHeight;
                        return (
                          <g key={d.label} className="group/bar cursor-pointer">
                            <title>{`Time: ${d.label} | Revenue: $${d.value.toFixed(2)}`}</title>
                            <rect x={x - 4} y={0} width={barWidth + 8} height={180} fill="transparent" />
                            <rect
                              x={x}
                              y={y}
                              width={barWidth}
                              height={barHeight}
                              rx={6}
                              className="fill-blue-500 hover:fill-blue-600 transition-all duration-300"
                            />
                            <text
                              x={x + barWidth / 2}
                              y={192}
                              textAnchor="middle"
                              className="text-[9px] font-black text-gray-400 fill-current uppercase tracking-wider"
                            >
                              {d.label}
                            </text>
                            {d.value > 0 && (
                              <text
                                x={x + barWidth / 2}
                                y={y - 8}
                                textAnchor="middle"
                                className="text-[9px] font-black text-blue-600 fill-current opacity-0 group-hover/bar:opacity-100 transition-opacity duration-200"
                              >
                                {`$${Math.round(d.value)}`}
                              </text>
                            )}
                          </g>
                        );
                      })}
                      <line x1={0} y1={170} x2={500} y2={170} stroke="#f3f4f6" strokeWidth={2} />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Top Products Block */}
            <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Performance
                </span>
                <h3 className="text-xl font-black text-gray-900 mt-1 mb-6">Top Selling Items</h3>
              </div>

              {topProducts.length === 0 ? (
                <div className="flex-1 flex items-center justify-center border border-dashed border-gray-100 rounded-3xl py-12">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    No items sold yet
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {topProducts.map((prod) => (
                    <div key={prod.name} className="space-y-2">
                      <div className="flex justify-between text-xs font-black">
                        <span className="text-gray-700 truncate max-w-[180px]">{prod.name}</span>
                        <span className="text-gray-400">
                          {prod.quantity} sold • <span className="text-gray-900">${prod.revenue.toFixed(2)}</span>
                        </span>
                      </div>
                      <div className="w-full bg-gray-50 border border-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${(prod.quantity / maxProductQty) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Grid: Recent Orders & Payment breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Orders Panel */}
            <div className="lg:col-span-2 p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Live Stream
                  </span>
                  <h3 className="text-xl font-black text-gray-900 mt-1">Recent Register Orders</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-amber-500 bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-full">
                    {statusStats.pending} PENDING
                  </span>
                  <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full">
                    {statusStats.completed} COMPLETED
                  </span>
                </div>
              </div>

              {recentOrders.length === 0 ? (
                <div className="py-16 text-center border-2 border-dashed border-gray-100 rounded-3xl">
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                    No orders in selected range
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-wider">
                          Order #
                        </th>
                        <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-wider">
                          Total
                        </th>
                        <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-wider text-right">
                          Timestamp
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="group hover:bg-gray-50/50 transition-colors">
                          <td className="py-4 text-sm font-black text-gray-900">
                            #{order.orderNo}
                          </td>
                          <td className="py-4 text-xs font-bold text-gray-500">
                            {order.orderType}
                          </td>
                          <td className="py-4 text-sm font-black text-blue-600">
                            ${Number(order.totalAmount).toFixed(2)}
                          </td>
                          <td className="py-4">
                            <span
                              className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded ${
                                order.status === "COMPLETED"
                                  ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                  : order.status === "PENDING"
                                  ? "bg-amber-50 text-amber-600 border border-amber-100"
                                  : "bg-red-50 text-red-600 border border-red-100"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="py-4 text-xs font-bold text-gray-400 text-right">
                            {new Date(order.orderTime).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Payment Distribution Panel */}
            <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Payments
                </span>
                <h3 className="text-xl font-black text-gray-900 mt-1 mb-6">Split Matrix</h3>
              </div>

              {filteredOrders.filter((o) => o.status === "COMPLETED").length === 0 ? (
                <div className="flex-1 flex items-center justify-center border border-dashed border-gray-100 rounded-3xl py-12">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    No completed payments
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {paymentStats.map((pay) => {
                    const PayIcon = pay.icon;
                    return (
                      <div key={pay.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gray-50 ${pay.text}`}>
                            <PayIcon size={16} />
                          </div>
                          <div>
                            <span className="block text-xs font-black text-gray-900">{pay.name}</span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase">
                              {pay.percent}% share
                            </span>
                          </div>
                        </div>
                        <span className="text-sm font-black text-gray-700">
                          ${pay.amount.toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminPageLayout>
  );
}
