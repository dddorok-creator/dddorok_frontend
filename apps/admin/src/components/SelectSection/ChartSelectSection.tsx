"use client";

import { useQuery } from "@tanstack/react-query";
import { useFormContext, useWatch } from "react-hook-form";

import { ChartTypeOrderDialog } from "./ChartTypeOrderDialog";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { chartTypeQueries } from "@/queries/chart-type";

type ChartTypeMap = {
  chart_type_id: string;
  order: number;
};

interface ChartTypeSelectProps {
  chartTypeMaps: ChartTypeMap[];
  onChange: (chartTypeMaps: ChartTypeMap[]) => void;
}

export function ChartTypeSelect({
  chartTypeMaps,
  onChange,
}: ChartTypeSelectProps) {
  const { data: chartTypeList } = useQuery(chartTypeQueries.list());

  const selectedChartTypes = (chartTypeMaps || [])
    .map((map) => ({
      ...chartTypeList?.find((ct) => ct.id === map.chart_type_id),
      chart_type_id: map.chart_type_id,
      order: map.order,
      name:
        chartTypeList?.find((ct) => ct.id === map.chart_type_id)?.name ?? "",
    }))
    .sort((a, b) => a.order - b.order);

  const getChangeArray = (
    prevData: ChartTypeMap[],
    { checked, chartTypeId }: { checked: boolean; chartTypeId: string }
  ) => {
    const currentValues = prevData || [];
    if (checked) {
      return [...currentValues, { chart_type_id: chartTypeId, order: 0 }];
    } else {
      return currentValues.filter(
        (map: ChartTypeMap) => map.chart_type_id !== chartTypeId
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>차트 유형 선택</CardTitle>
        <CardDescription>차트 유형을 설정해주세요.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormItem>
          <FormLabel>차트 유형</FormLabel>
          <FormDescription>
            차트 유형 관리에 등록된 목록에서 선택할 수 있으며, 다중 선택이
            가능합니다.
          </FormDescription>
          <div className="space-y-2 mt-2">
            {chartTypeList?.map((chartType) => (
              <div key={chartType.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`chart-type-${chartType.id}`}
                  checked={(chartTypeMaps || []).some(
                    (map: ChartTypeMap) => map.chart_type_id === chartType.id
                  )}
                  onCheckedChange={(checked) => {
                    onChange(
                      getChangeArray(chartTypeMaps, {
                        checked: checked === true,
                        chartTypeId: chartType.id,
                      })
                    );
                  }}
                />
                <label
                  htmlFor={`chart-type-${chartType.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {chartType.name}
                </label>
              </div>
            ))}
          </div>
          <FormMessage />
        </FormItem>
        <ChartTypeOrderDialog
          dialogButtonDisabled={selectedChartTypes.length < 2}
          chartTypes={selectedChartTypes}
          onSave={(newOrder: { chart_type_id: string; order: number }[]) => {
            // order만 반영, 기타 정보는 기존 chartTypeMaps에서 유지
            const merged = newOrder.map((o) => ({
              ...(chartTypeMaps.find(
                (m) => m.chart_type_id === o.chart_type_id
              ) || {}),
              order: o.order,
            }));
            onChange(merged as any);
          }}
        />
      </CardContent>
    </Card>
  );
}
