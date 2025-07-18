"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"

export default function AnalyticsPage() {
  const { isRTL } = useLanguage()

  return (
    <DashboardLayout role="admin">
      <div className={`space-y-6 ${isRTL ? "rtl" : "ltr"}`}>
        <div className={isRTL ? "text-right" : ""}>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h2>
          <p className="text-gray-600 dark:text-gray-300">Advanced analytics and insights</p>
        </div>

        <Card>
          <CardHeader className={isRTL ? "text-right" : ""}>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>Advanced analytics features are under development</CardDescription>
          </CardHeader>
          <CardContent className={`text-center py-12 ${isRTL ? "text-right" : ""}`}>
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Analytics Dashboard</h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
              We're working on bringing you comprehensive analytics and insights. This feature will be available soon
              with detailed reports and visualizations.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
