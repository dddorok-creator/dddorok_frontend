import ExcelTableWithLibrary from "./_components/react-spreadsheet-typescript";
import TemplateDetailClient from "./template-detail-client";

export default async function TemplatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // return <ExcelTableWithLibrary />;
  return <TemplateDetailClient templateId={id} />;
}
