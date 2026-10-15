import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useBodyScrollLock } from "../../hooks/useReveal";

export type LightboxItem = {
  src: string;
  alt: string;
  title: string;
  caption: string;
  category: string;
};

/**
 * Accessible image viewer.
 * - Escape closes, arrow keys move between images.
 * - Focus moves into the dialog on open and returns to the trigger on close.
 * - Rendered only while open, so it never traps focus when hidden.
 */
export function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: LightboxItem[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useBodyScrollLock(true);

  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => previouslyFocused.current?.focus();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onNavigate((index + 1) % items.length);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onNavigate((index - 1 + items.length) % items.length);
      }
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>("button, [href]");
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [index, items.length, onClose, onNavigate]);

  const item = items[index];
  if (!item) return null;

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Image viewer: ${item.title}`}
      ref={dialogRef}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="lightbox__bar">
        <span className="badge badge--deep">{item.category}</span>
        <button type="button" className="lightbox__btn" onClick={onClose} ref={closeRef}>
          <X aria-hidden="true" />
          <span className="visually-hidden">Close image viewer</span>
        </button>
      </div>

      <div className="lightbox__stage">
        <img src={item.src} alt={item.alt} />
        <button
          type="button"
          className="lightbox__btn lightbox__nav lightbox__nav--prev"
          onClick={() => onNavigate((index - 1 + items.length) % items.length)}
        >
          <ChevronLeft aria-hidden="true" />
          <span className="visually-hidden">Previous image</span>
        </button>
        <button
          type="button"
          className="lightbox__btn lightbox__nav lightbox__nav--next"
          onClick={() => onNavigate((index + 1) % items.length)}
        >
          <ChevronRight aria-hidden="true" />
          <span className="visually-hidden">Next image</span>
        </button>
      </div>

      <div>
        <p className="lightbox__caption">
          <strong>{item.title}</strong>
          {item.caption}
        </p>
        <p className="lightbox__count" style={{ textAlign: "center", marginLeft: 0 }}>
          {index + 1} / {items.length}
        </p>
      </div>
    </div>
  );
}
