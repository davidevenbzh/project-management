import type { AutocompleteOption } from "../inputs/AutocompleteInput/AutocompleteInput";
import type { DataTableColumn, DataTableRow } from "../DataTable/DataTable";

export const teamOptions: AutocompleteOption[] = [
  {
    label: "Platform",
    value: "platform",
    description: "Infra, auth, and deploy tooling.",
  },
  {
    label: "Design systems",
    value: "design-systems",
    description: "Component library and UX patterns.",
  },
  {
    label: "Growth",
    value: "growth",
    description: "Acquisition, onboarding, and conversion.",
  },
  {
    label: "Support ops",
    value: "support",
    description: "Inbox quality and escalation handling.",
  },
];

export const activityItems = [
  {
    id: "activity-1",
    primary: "Theme tokens established",
    secondary: "Dark and light modes now share a single token surface.",
    meta: "04 Apr",
  },
  {
    id: "activity-2",
    primary: "Storybook stories generated",
    secondary: "Each primitive exposes a concrete review surface.",
    meta: "05 Apr",
  },
  {
    id: "activity-3",
    primary: "Launch table connected",
    secondary: "Sorting, row selection, and pagination are active.",
    meta: "06 Apr",
  },
];

export const tableColumns: DataTableColumn[] = [
  { key: "project", header: "Project", sortable: true },
  { key: "owner", header: "Owner", sortable: true },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (row: DataTableRow) => {
      const tone =
        row.status === "Blocked"
          ? "danger"
          : row.status === "Review"
            ? "attention"
            : "active";
      return (
        <span className="pm-table__status" data-tone={tone}>
          {row.status}
        </span>
      );
    },
  },
  {
    key: "progress",
    header: "Progress",
    sortable: true,
    align: "right",
    sortAccessor: (row: DataTableRow) => Number(row.progress ?? 0),
  },
  { key: "due", header: "Due", sortable: true, align: "right" },
];

export const tableRows: DataTableRow[] = [
  {
    id: "row-1",
    project: "Frontend library",
    owner: "Dana",
    status: "Active",
    progress: 82,
    due: "2026-04-11",
  },
  {
    id: "row-2",
    project: "Auth hardening",
    owner: "Jules",
    status: "Review",
    progress: 61,
    due: "2026-04-14",
  },
  {
    id: "row-3",
    project: "Mobile sync",
    owner: "Ari",
    status: "Blocked",
    progress: 28,
    due: "2026-04-17",
  },
  {
    id: "row-4",
    project: "Audit trail",
    owner: "Nina",
    status: "Active",
    progress: 76,
    due: "2026-04-21",
  },
  {
    id: "row-5",
    project: "Backlog pruning",
    owner: "Milo",
    status: "Review",
    progress: 49,
    due: "2026-04-22",
  },
  {
    id: "row-6",
    project: "SLA board",
    owner: "Sage",
    status: "Active",
    progress: 90,
    due: "2026-04-23",
  },
];
