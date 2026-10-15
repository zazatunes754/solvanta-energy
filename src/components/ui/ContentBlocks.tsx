import { CircleCheck } from "lucide-react";
import type { ContentBlock } from "../../data/contentTypes";
import { Callout } from "./primitives";

/**
 * Renders one typed content block. Shared by the knowledge hub articles and
 * the service detail guides so both stay on the same typographic system.
 */
export function ContentBlockView({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h2":
      return <h2>{block.text}</h2>;
    case "h3":
      return <h3>{block.text}</h3>;
    case "ul":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
    case "takeaways":
      return (
        <div className="takeaways">
          <h2 className="takeaways__title">Key takeaways</h2>
          <ul>
            {block.items.map((item) => (
              <li key={item}>
                <CircleCheck aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    case "callout":
      return (
        <Callout title={block.title} tone={block.tone ?? "info"}>
          <p>{block.text}</p>
        </Callout>
      );
    case "quote":
      return <blockquote>{block.text}</blockquote>;
    case "table":
      return (
        <div className="table-wrap" tabIndex={0} style={{ marginBlock: "var(--space-5)" }}>
          <table className="data">
            <caption>{block.caption}</caption>
            <thead>
              <tr>
                {block.head.map((head) => (
                  <th scope="col" key={head}>
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join("-")}>
                  {row.map((cell, index) =>
                    index === 0 ? (
                      <th scope="row" key={cell} style={{ fontFamily: "var(--font-sans)" }}>
                        {cell}
                      </th>
                    ) : (
                      <td key={cell}>{cell}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}
