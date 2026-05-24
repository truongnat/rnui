import type { ReactNode } from 'react';

export type ComponentPreviewProps = {
  title?: string;
  description?: string;
  /** Constrain inner stage to mobile-like width (360–420px) */
  mobile?: boolean;
  children: ReactNode;
};

export default function ComponentPreview({
  title,
  description,
  mobile = true,
  children,
}: ComponentPreviewProps) {
  return (
    <div className="rnui-preview not-content">
      {title || description ? (
        <div className="rnui-preview__header">
          {title ? <p className="rnui-preview__title">{title}</p> : null}
          {description ? (
            <p className="rnui-preview__description">{description}</p>
          ) : null}
        </div>
      ) : null}
      <div
        className={
          mobile
            ? 'rnui-preview__stage rnui-preview__stage--mobile'
            : 'rnui-preview__stage'
        }
      >
        {mobile ? (
          <div className="rnui-preview__device">{children}</div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
