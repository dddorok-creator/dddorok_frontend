import { privateInstance } from "./instance";

export interface TemplateType {
  id: string;
  name: string;
  thumbnail_url: string | null;
  subscribe_type: string;
  category_small: string;
}

export interface GetTemplateListRequest {
  category_medium?: string;
  category_small?: string;
  pageSize?: string;
}

export interface GetTemplateListResponse {
  total: number;
  page: number;
  page_size: number;
  items: TemplateType[];
}

export const getTemplates = async (request: GetTemplateListRequest) => {
  const params = new URLSearchParams();
  if (request.category_medium) {
    params.set("category_medium", request.category_medium);
  }
  if (request.category_small) {
    params.set("category_small", request.category_small);
  }
  if (request.pageSize) {
    params.set("pageSize", request.pageSize);
  }

  const response = await privateInstance
    .get<{ data: GetTemplateListResponse }>("template/list", {
      searchParams: params,
    })
    .json();
  return response.data;
};

interface MeasurementType {
  measurementCode: string;
  sliderEnabled: boolean;
  code: string;
  label: string;
  value: number;
  min: number;
  max: number;
  rangeToggle: boolean;
}

export interface ChartType {
  id: string;
  name: string;
  svg_url: string;
  measurements: MeasurementType[];
}

export interface GetTemplateChartListResponse {
  template_id: string;
  chart_types: ChartType[];
}

export const getTemplateChartList = async (templateId: string) => {
  const response = await privateInstance
    .get<{
      data: GetTemplateChartListResponse;
    }>(`template/${templateId}/chart-list`)
    .json();
  return response.data;
};
