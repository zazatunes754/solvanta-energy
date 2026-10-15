import { useState, type ReactNode } from "react";
import { Plus } from "lucide-react";

export type AccordionItem = {
  id: string;
  /** Visible trigger content. */
  heading: ReactNode;
  /** Panel content. Kept in the DOM for search engines and in-page find. */
  content: ReactNode;
};

type Props = {
  items: AccordionItem[];
  /** Allow several panels open at once (default: one at a time). */
  allowMultiple?: boolean;
  /** IDs that start expanded. */
  defaultOpenIds?: string[];
  /** Accessible name for the group. */
  ariaLabel?: string;
};

/**
 * Accessible accordion.
 * - Triggers are real buttons inside a heading, so keyboard and screen reader
 *   navigation behave the way people expect.
 * - Panels animate with `grid-template-rows`, which needs no JS measurement.
 * - Collapsed panels are marked `inert` so their links never take focus.
 */
export function Accordion({ items, allowMultiple = false, defaultOpenIds = [], ariaLabel }: Props) {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenIds);

  const toggle = (id: string) => {
    setOpenIds((current) => {
      if (current.includes(id)) return current.filter((value) => value !== id);
      return allowMultiple ? [...current, id] : [id];
    });
  };

  return (
    <div className="accordion" aria-label={ariaLabel}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const triggerId = `${item.id}-trigger`;
        const panelId = `${item.id}-panel`;

        return (
          <div className="accordion__item" key={item.id}>
            <h3 className="accordion__heading">
              <button
                type="button"
                id={triggerId}
                className="accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
              >
                <span>{item.heading}</span>
                <Plus className="accordion__icon" aria-hidden="true" />
              </button>
            </h3>
            <div
              className="accordion__panel"
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              data-open={isOpen}
              inert={!isOpen}
            >
              <div className="accordion__inner">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
