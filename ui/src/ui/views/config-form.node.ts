import { html, nothing, type TemplateResult } from "lit";
import type { ConfigUiHints } from "../types";
import {
  hintForPath,
  humanize,
  schemaType,
  isSensitivePath,
  type JsonSchema,
} from "./config-form.shared";

export type RenderNodeProps = {
  schema: JsonSchema;
  value: unknown;
  path: Array<string | number>;
  hints: ConfigUiHints;
  unsupported: Set<string>;
  disabled: boolean;
  showLabel: boolean;
  onPatch: (path: Array<string | number>, value: unknown) => void;
};

export function renderNode(props: RenderNodeProps): TemplateResult {
  const { schema, value, path, hints, unsupported, disabled, showLabel, onPatch } = props;
  const type = schemaType(schema);
  const key = path[path.length - 1];
  const label = schema.title ?? (typeof key === "string" ? humanize(key) : String(key));
  const hint = hintForPath(path, hints);
  const description = hint?.help ?? schema.description ?? "";
  const isUnsupported = unsupported.has(path.join("."));
  const isSensitive = isSensitivePath(path);

  if (isUnsupported) {
    return html`<div class="config-field config-field--unsupported">
      <span class="muted">Unsupported field: ${label}</span>
    </div>`;
  }

  if (schema.enum && schema.enum.length > 0) {
    return renderEnumField({
      label,
      description,
      value: String(value ?? schema.default ?? ""),
      options: schema.enum.map((e) => String(e)),
      disabled,
      showLabel,
      onChange: (v) => onPatch(path, v),
    });
  }

  switch (type) {
    case "boolean":
      return renderBooleanField({
        label,
        description,
        value: Boolean(value ?? schema.default ?? false),
        disabled,
        showLabel,
        onChange: (v) => onPatch(path, v),
      });
    case "number":
    case "integer":
      return renderNumberField({
        label,
        description,
        value: Number(value ?? schema.default ?? 0),
        disabled,
        showLabel,
        onChange: (v) => onPatch(path, v),
      });
    case "string":
      return renderStringField({
        label,
        description,
        value: String(value ?? schema.default ?? ""),
        disabled,
        showLabel,
        isSensitive,
        onChange: (v) => onPatch(path, v),
      });
    case "array":
      return renderArrayField({
        label,
        description,
        schema,
        value: Array.isArray(value) ? value : [],
        path,
        hints,
        disabled,
        showLabel,
        onPatch,
      });
    case "object":
      return renderObjectField({
        label,
        description,
        schema,
        value: (value ?? {}) as Record<string, unknown>,
        path,
        hints,
        unsupported,
        disabled,
        showLabel,
        onPatch,
      });
    default:
      return renderStringField({
        label,
        description,
        value: String(value ?? ""),
        disabled,
        showLabel,
        isSensitive,
        onChange: (v) => onPatch(path, v),
      });
  }
}

type FieldProps = {
  label: string;
  description?: string;
  disabled: boolean;
  showLabel: boolean;
};

function renderBooleanField(
  props: FieldProps & { value: boolean; onChange: (v: boolean) => void },
): TemplateResult {
  return html`
    <label class="config-field config-field--boolean">
      ${props.showLabel
        ? html`<span class="config-field__label">${props.label}</span>`
        : nothing}
      <input
        type="checkbox"
        .checked=${props.value}
        ?disabled=${props.disabled}
        @change=${(e: Event) =>
          props.onChange((e.target as HTMLInputElement).checked)}
      />
      ${props.description
        ? html`<span class="config-field__help">${props.description}</span>`
        : nothing}
    </label>
  `;
}

function renderStringField(
  props: FieldProps & {
    value: string;
    isSensitive: boolean;
    onChange: (v: string) => void;
  },
): TemplateResult {
  return html`
    <label class="config-field config-field--string">
      ${props.showLabel
        ? html`<span class="config-field__label">${props.label}</span>`
        : nothing}
      <input
        type=${props.isSensitive ? "password" : "text"}
        .value=${props.value}
        ?disabled=${props.disabled}
        @input=${(e: Event) =>
          props.onChange((e.target as HTMLInputElement).value)}
      />
      ${props.description
        ? html`<span class="config-field__help">${props.description}</span>`
        : nothing}
    </label>
  `;
}

function renderNumberField(
  props: FieldProps & { value: number; onChange: (v: number) => void },
): TemplateResult {
  return html`
    <label class="config-field config-field--number">
      ${props.showLabel
        ? html`<span class="config-field__label">${props.label}</span>`
        : nothing}
      <input
        type="number"
        .value=${String(props.value)}
        ?disabled=${props.disabled}
        @input=${(e: Event) =>
          props.onChange(Number((e.target as HTMLInputElement).value))}
      />
      ${props.description
        ? html`<span class="config-field__help">${props.description}</span>`
        : nothing}
    </label>
  `;
}

function renderEnumField(
  props: FieldProps & { value: string; options: string[]; onChange: (v: string) => void },
): TemplateResult {
  return html`
    <label class="config-field config-field--enum">
      ${props.showLabel
        ? html`<span class="config-field__label">${props.label}</span>`
        : nothing}
      <select
        .value=${props.value}
        ?disabled=${props.disabled}
        @change=${(e: Event) =>
          props.onChange((e.target as HTMLSelectElement).value)}
      >
        ${props.options.map(
          (opt) => html`<option value=${opt}>${opt}</option>`,
        )}
      </select>
      ${props.description
        ? html`<span class="config-field__help">${props.description}</span>`
        : nothing}
    </label>
  `;
}

function renderArrayField(
  props: FieldProps & {
    schema: JsonSchema;
    value: unknown[];
    path: Array<string | number>;
    hints: ConfigUiHints;
    onPatch: (path: Array<string | number>, value: unknown) => void;
  },
): TemplateResult {
  const items = props.value;
  const itemSchema = props.schema.items && !Array.isArray(props.schema.items)
    ? props.schema.items
    : undefined;

  return html`
    <div class="config-field config-field--array">
      ${props.showLabel
        ? html`<span class="config-field__label">${props.label}</span>`
        : nothing}
      ${props.description
        ? html`<span class="config-field__help">${props.description}</span>`
        : nothing}
      <div class="config-array-items">
        ${items.map((item, index) =>
          itemSchema
            ? renderNode({
                schema: itemSchema,
                value: item,
                path: [...props.path, index],
                hints: props.hints,
                unsupported: new Set(),
                disabled: props.disabled,
                showLabel: false,
                onPatch: props.onPatch,
              })
            : html`<div class="config-array-item">${String(item)}</div>`,
        )}
      </div>
    </div>
  `;
}

function renderObjectField(
  props: FieldProps & {
    schema: JsonSchema;
    value: Record<string, unknown>;
    path: Array<string | number>;
    hints: ConfigUiHints;
    unsupported: Set<string>;
    onPatch: (path: Array<string | number>, value: unknown) => void;
  },
): TemplateResult {
  const properties = props.schema.properties ?? {};
  const entries = Object.entries(properties);

  if (entries.length === 0) {
    return html`
      <div class="config-field config-field--object">
        ${props.showLabel
          ? html`<span class="config-field__label">${props.label}</span>`
          : nothing}
        ${props.description
          ? html`<span class="config-field__help">${props.description}</span>`
          : nothing}
        <div class="muted">No properties defined.</div>
      </div>
    `;
  }

  return html`
    <div class="config-field config-field--object">
      ${props.showLabel
        ? html`<span class="config-field__label">${props.label}</span>`
        : nothing}
      ${props.description
        ? html`<span class="config-field__help">${props.description}</span>`
        : nothing}
      <div class="config-object-properties">
        ${entries.map(([key, propSchema]) =>
          renderNode({
            schema: propSchema,
            value: props.value[key],
            path: [...props.path, key],
            hints: props.hints,
            unsupported: props.unsupported,
            disabled: props.disabled,
            showLabel: true,
            onPatch: props.onPatch,
          }),
        )}
      </div>
    </div>
  `;
}
