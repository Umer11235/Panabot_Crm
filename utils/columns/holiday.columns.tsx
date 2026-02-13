import { DataTableColumn } from "@/utils/types/datatable.types";
import { Holiday } from "@/utils/types/holiday.types";

export const holidayColumns: DataTableColumn<Holiday>[] = [
  { header: '# Number', key: 'id' },
  { header: 'Date', key: 'date' },
  { header: 'Day', key: 'day' },
  { header: 'Holiday Type', key: 'type' },
  { header: 'Holiday', key: 'holiday' },
];
