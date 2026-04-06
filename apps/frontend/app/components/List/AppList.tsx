import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import { Surface } from "../Surface/Surface";

export type AppListItem = {
  id: string;
  meta?: React.ReactNode;
  primary: React.ReactNode;
  secondary?: React.ReactNode;
};

export type AppListProps = {
  description?: string;
  items: AppListItem[];
  title?: string;
};

/**
 * Displays a compact list for activity, metadata, or summary rows.
 */
export function AppList({ description, items, title }: AppListProps) {
  return (
    <Surface description={description} title={title}>
      <List className="pm-list" disablePadding>
        {items.map((item) => (
          <ListItem
            key={item.id}
            secondaryAction={item.meta ? <span className="pm-list__meta">{item.meta}</span> : null}
          >
            <ListItemText primary={item.primary} secondary={item.secondary} />
          </ListItem>
        ))}
      </List>
    </Surface>
  );
}
