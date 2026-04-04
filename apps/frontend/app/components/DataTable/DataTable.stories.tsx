import type { Meta, StoryObj } from '@storybook/react-vite';

import { DataTable, type DataTableRow } from './DataTable';

const rows: DataTableRow[] = [
  { id: 'p-01', project: 'Frontend library', owner: 'Dana', status: 'Active', progress: 82, due: '2026-04-11' },
  { id: 'p-02', project: 'Auth hardening', owner: 'Jules', status: 'Review', progress: 61, due: '2026-04-14' },
  { id: 'p-03', project: 'Mobile sync', owner: 'Ari', status: 'Blocked', progress: 28, due: '2026-04-17' },
  { id: 'p-04', project: 'Audit trail', owner: 'Nina', status: 'Active', progress: 76, due: '2026-04-21' },
  { id: 'p-05', project: 'Backlog pruning', owner: 'Milo', status: 'Review', progress: 49, due: '2026-04-22' },
  { id: 'p-06', project: 'SLA board', owner: 'Sage', status: 'Active', progress: 90, due: '2026-04-23' },
];

const meta = {
  title: 'Components/DataTable',
  component: DataTable,
  args: {
    title: 'Project monitor',
    columns: [
      { key: 'project', header: 'Project', sortable: true },
      { key: 'owner', header: 'Owner', sortable: true },
      {
        key: 'status',
        header: 'Status',
        sortable: true,
        render: (row: DataTableRow) => {
          const tone = row.status === 'Blocked' ? 'danger' : row.status === 'Review' ? 'attention' : 'active';
          return (
            <span className="pm-table__status" data-tone={tone}>
              {row.status}
            </span>
          );
        },
      },
      { key: 'progress', header: 'Progress', sortable: true, align: 'right', sortAccessor: (row: DataTableRow) => Number(row.progress ?? 0) },
      { key: 'due', header: 'Due', sortable: true, align: 'right' },
    ],
    rows,
  },
} satisfies Meta<typeof DataTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    rows: [],
  },
};