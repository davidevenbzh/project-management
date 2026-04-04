import "./TaskCard.css";

export type TaskCardStatus = "planned" | "in-progress" | "done";

export type TaskCardProps = {
  title: string;
  description: string;
  dueLabel: string;
  status: TaskCardStatus;
  tags?: string[];
};

/**
 * Displays a simple project task summary for Storybook-driven component work.
 */
export function TaskCard({
  title,
  description,
  dueLabel,
  status,
  tags = [],
}: TaskCardProps) {
  return (
    <article className="task-card" data-status={status}>
      <header className="task-card__header">
        <div>
          <h2 className="task-card__title">{title}</h2>
          <p className="task-card__meta">Due {dueLabel}</p>
        </div>
        <span className="task-card__status">{status.replace("-", " ")}</span>
      </header>

      <p className="task-card__body">{description}</p>

      {tags.length > 0 ? (
        <footer className="task-card__footer">
          {tags.map((tag) => (
            <span className="task-card__chip" key={tag}>
              {tag}
            </span>
          ))}
        </footer>
      ) : null}
    </article>
  );
}
