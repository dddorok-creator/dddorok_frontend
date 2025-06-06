import { queryOptions } from "@tanstack/react-query";

import {
  getTemplateMeasurementValues,
  GetTemplateMeasurementValuesResponse,
} from "@/services/template/measure-value";
import {
  getTemplateById,
  GetTemplateByIdResponse,
  getTemplates,
  GetTemplatesResponse,
} from "@/services/template/template";

export const templateQueryKeys = {
  all: () => ["templates"],
  templates: () => [...templateQueryKeys.all(), "list"],
  templateById: (templateId: string) => [
    ...templateQueryKeys.all(),
    templateId,
  ],
  templateMeasurementValues: (templateId: string) => [
    ...templateQueryKeys.all(),
    templateId,
    "measurement-values",
  ],
};

const listQueryOptions = () => {
  return queryOptions<GetTemplatesResponse>({
    queryKey: templateQueryKeys.templates(),
    queryFn: getTemplates,
  });
};

const detailQueryOptions = (templateId: string) => {
  return queryOptions<GetTemplateByIdResponse>({
    queryKey: templateQueryKeys.templateById(templateId),
    queryFn: () => getTemplateById(templateId),
  });
};

export const templateQueries = {
  list: listQueryOptions,
  detail: detailQueryOptions,
};

const measurementValuesQueryOptions = (templateId: string) => {
  return queryOptions<GetTemplateMeasurementValuesResponse>({
    queryKey: templateQueryKeys.templateMeasurementValues(templateId),
    queryFn: () => getTemplateMeasurementValues(templateId),
  });
};

export const templateMeasurementValuesQueries = {
  measurementValues: measurementValuesQueryOptions,
};
