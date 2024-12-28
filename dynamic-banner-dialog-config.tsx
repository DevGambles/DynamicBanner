import { useState } from 'react';
import {
  WidgetField,
  WidgetFieldProps,
  WidgetFieldTypes,
} from 'pages/widgets/authoring/widget-field/widget-field';
import {
  PopoverBody,
  PopoverHeader,
  PopoverFooter,
  PopoverClose,
} from 'components/common/popover';
import {
  horizontalAlignOptions,
  verticalAlignOptions,
} from 'pages/widgets/authoring/__config__/widget-alignment-config';
import {
  HorizontalAlign,
  VerticalAlign,
} from 'types/widget/widget-alignment-types';

export type DynamicBannerConfigFields = {
  creativeName: string;
  contentHorizontalAlign: HorizontalAlign;
  contentVerticalAlign: VerticalAlign;
  textAlign: HorizontalAlign;
  accessibilityLabel: string;
  altText: string;
};

interface DynamicBannerConfigProps extends DynamicBannerConfigFields {
  onApply: (props: DynamicBannerConfigFields) => void;
}

const DynamicBannerConfig = ({
  creativeName,
  contentHorizontalAlign,
  contentVerticalAlign,
  textAlign,
  accessibilityLabel,
  altText,
  onApply,
}: DynamicBannerConfigProps) => {
  const [newCreativeName, setNewCreativeName] = useState<string>(creativeName);
  const [newContentHorizontalAlign, setNewContentHorizontalAlign] =
    useState<HorizontalAlign>(contentHorizontalAlign);
  const [newContentVerticalAlign, setNewContentVerticalAlign] =
    useState<VerticalAlign>(contentVerticalAlign);
  const [newTextAlign, setNewTextAlign] = useState<HorizontalAlign>(textAlign);
  const [newAccessibilityLabel, setNewAccessibilityLabel] =
    useState<string>(accessibilityLabel);
  const [newAltText, setNewAltText] = useState<string>(altText);

  const configPopoverFields: WidgetFieldProps[] = [
    {
      type: WidgetFieldTypes.TEXT,
      label: 'Creative Name',
      value: newCreativeName,
      placeholder: 'Add a creative name for your banner',
      onChange: event => setNewCreativeName(event.target.value),
      required: true,
    },
    {
      type: WidgetFieldTypes.SELECT,
      label: 'Content Alignment (Horizontal)',
      options: horizontalAlignOptions,
      value: newContentHorizontalAlign,
      onChange: event =>
        setNewContentHorizontalAlign(event.target.value as HorizontalAlign),
      required: true,
    },
    {
      type: WidgetFieldTypes.SELECT,
      label: 'Content Alignment (Vertical)',
      options: verticalAlignOptions,
      value: newContentVerticalAlign,
      onChange: event =>
        setNewContentVerticalAlign(event.target.value as VerticalAlign),
      required: true,
    },
    {
      type: WidgetFieldTypes.SELECT,
      label: 'Text Alignment',
      options: horizontalAlignOptions,
      value: newTextAlign,
      onChange: event => setNewTextAlign(event.target.value as HorizontalAlign),
      required: true,
    },
    {
      type: WidgetFieldTypes.TEXT,
      label: 'Accessibility Label (optional)',
      value: newAccessibilityLabel,
      placeholder: 'Add an accessibility label',
      onChange: event => setNewAccessibilityLabel(event.target.value),
      required: false,
    },
    {
      type: WidgetFieldTypes.TEXT,
      label: 'Alt Text (optional)',
      value: newAltText,
      placeholder: 'Add alt text',
      onChange: event => setNewAltText(event.target.value),
      required: false,
    },
  ];

  const configPopover = configPopoverFields.map(
    (field: WidgetFieldProps, index: number) => (
      <WidgetField key={index} {...field} />
    ),
  );

  return (
    <>
      <PopoverHeader>Widget Config</PopoverHeader>
      <PopoverBody>{configPopover}</PopoverBody>
      <PopoverFooter>
        <PopoverClose emphasis="secondary">Cancel</PopoverClose>
        <PopoverClose
          onClick={() =>
            onApply({
              creativeName: newCreativeName,
              contentHorizontalAlign: newContentHorizontalAlign,
              contentVerticalAlign: newContentVerticalAlign,
              textAlign: newTextAlign,
              accessibilityLabel: newAccessibilityLabel,
              altText: newAltText,
            })
          }
        >
          Apply
        </PopoverClose>
      </PopoverFooter>
    </>
  );
};

export default DynamicBannerConfig;
