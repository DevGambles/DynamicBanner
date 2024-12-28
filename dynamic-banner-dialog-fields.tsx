import { useState } from 'react';
import { KibButtonNew } from '@chewy/kib-controls-react';
import {
  WidgetField,
  WidgetFieldProps,
  WidgetFieldTypes,
} from 'pages/widgets/authoring/widget-field/widget-field';
import {
  typeSizeOptionMap,
  textTagOptionMap,
  buttonStyleOptionMap,
} from 'pages/widgets/authoring/__config__/widget-styles-config';
import {
  TypeSize,
  TextTag,
  TextTagOption,
  TypeSizeOption,
  ButtonStyle,
  ButtonStyleOption,
} from 'types/widget/widget-style-types';
import widgetDialogStyles from 'pages/widgets/authoring/styles/widget-dialog.module.scss';
import widgetFieldStyles from 'pages/widgets/authoring/widget-field/widget-field.module.scss';
import { DynamicBannerFields } from './dynamic-banner';

type DynamicBannerFieldsProps = {
  onApply: (props: DynamicBannerFields) => void;
  className?: string;
  onCancel?: () => void;
} & DynamicBannerFields;

const DynamicBannerFieldsConfig = ({
  header,
  headerTypeSize,
  headerTextTag,
  subtitle,
  subtitleTypeSize,
  topline,
  toplineTypeSize,
  ctaText,
  ctaUrl,
  ctaStyle,
  onApply,
}: DynamicBannerFieldsProps) => {
  const [newSubtitle, setNewSubtitle] = useState<string>(subtitle);
  const [newSubtitleTypeSize, setNewSubtitleTypeSize] =
    useState<TypeSize>(subtitleTypeSize);

  const [newTopline, setNewTopline] = useState<string>(topline);
  const [newToplineTypeSize, setNewToplineTypeSize] =
    useState<TypeSize>(toplineTypeSize);

  const [newHeader, setNewHeader] = useState<string>(header);
  const [newHeaderTextTag, setNewHeaderTextTag] =
    useState<TextTag>(headerTextTag);
  const [newHeaderTypeSize, setNewHeaderTypeSize] =
    useState<TypeSize>(headerTypeSize);

  const [newCtaText, setNewCtaText] = useState<string>(ctaText);
  const [newCtaUrl, setNewCtaUrl] = useState<string>(ctaUrl);
  const [newCtaStyle, setNewCtaStyle] = useState<ButtonStyle>(ctaStyle);

  const subtitleTypeSizeOptions: TypeSizeOption[] = [
    typeSizeOptionMap.LEVEL1,
    typeSizeOptionMap.LEVEL2,
  ];

  const typeSizeOptions: TypeSizeOption[] = [
    typeSizeOptionMap.LEVEL1,
    typeSizeOptionMap.LEVEL2,
    typeSizeOptionMap.LEVEL2,
    typeSizeOptionMap.LEVEL4,
    typeSizeOptionMap.LEVEL5,
    typeSizeOptionMap.LEVEL6,
    typeSizeOptionMap.LEVEL7,
  ];

  const textTagOptions: TextTagOption[] = [
    textTagOptionMap.H1,
    textTagOptionMap.H2,
    textTagOptionMap.H3,
    textTagOptionMap.H4,
    textTagOptionMap.P,
  ];

  const buttonStyleOptions: ButtonStyleOption[] = [
    buttonStyleOptionMap.NAVY_BLUE,
    buttonStyleOptionMap.CHEWY_BLUE,
    buttonStyleOptionMap.WHITE,
  ];

  const dynamicBannerWidgetFields: WidgetFieldProps[][] = [
    [
      {
        type: WidgetFieldTypes.SELECT,
        label: 'Topline Type Size',
        value: newToplineTypeSize,
        options: typeSizeOptions,
        onChange: event =>
          setNewToplineTypeSize(event.target.value as TypeSize),
      },
      {
        type: WidgetFieldTypes.RICH_TEXT,
        initialValue: topline,
        limit: 230,
        toolbar: 'bold underline forecolor backcolor bullist numlist',
        placeholder: 'Topline Text',
        onEditorUpdate: value => setNewTopline(value),
        label: 'Topline Text',
        value: newTopline,
      },
    ],
    [
      {
        type: WidgetFieldTypes.SELECT,
        label: 'Header Type Size',
        value: newHeaderTypeSize,
        options: typeSizeOptions,
        onChange: event => setNewHeaderTypeSize(event.target.value as TypeSize),
      },
      {
        type: WidgetFieldTypes.SELECT,
        label: 'Header Tag',
        value: newHeaderTextTag,
        options: textTagOptions,
        onChange: event => setNewHeaderTextTag(event.target.value as TextTag),
      },
      {
        type: WidgetFieldTypes.RICH_TEXT,
        initialValue: newHeader,
        limit: 230,
        toolbar: 'bold underline forecolor backcolor bullist numlist',
        label: 'Header Text',
        placeholder: 'Header Text',
        onEditorUpdate: value => setNewHeader(value),
        value: newHeader,
      },
    ],
    [
      {
        type: WidgetFieldTypes.SELECT,
        label: 'Subtitle Type Size',
        value: newSubtitleTypeSize,
        options: subtitleTypeSizeOptions,
        onChange: event =>
          setNewSubtitleTypeSize(event.target.value as TypeSize),
      },
      {
        type: WidgetFieldTypes.RICH_TEXT,
        initialValue: subtitle,
        limit: 230,
        toolbar: 'bold underline forecolor backcolor bullist numlist',
        placeholder: 'Subtitle Text',
        onEditorUpdate: value => setNewSubtitle(value),
        label: 'Subtitle Text',
        value: newSubtitle,
      },
    ],
    [
      {
        type: WidgetFieldTypes.SELECT,
        label: 'Button Style',
        value: newCtaStyle,
        options: buttonStyleOptions,
        onChange: event => setNewCtaStyle(event.target.value as ButtonStyle),
      },
      {
        type: WidgetFieldTypes.TEXT,
        label: 'Button Text',
        value: newCtaText,
        onChange: event => setNewCtaText(event.target.value),
      },
      {
        type: WidgetFieldTypes.TEXT,
        label: 'Button URL',
        value: newCtaUrl,
        onChange: event => setNewCtaUrl(event.target.value),
      },
    ],
  ];

  return (
    <div className={widgetDialogStyles.widgetDialog}>
      <h3 className={widgetDialogStyles.widgetDialog__heading}>
        Banner Configuration
      </h3>
      <div className={widgetFieldStyles.widgetFieldGroups}>
        {dynamicBannerWidgetFields.map(widgetField => (
          <div className={widgetFieldStyles.widgetFieldGroup}>
            {widgetField.map((field: WidgetFieldProps, index: number) => (
              <WidgetField key={index} {...field} />
            ))}
          </div>
        ))}
      </div>
      <div className={widgetDialogStyles.widgetDialog__footer}>
        <KibButtonNew
          size="small"
          theme="utility"
          emphasis="secondary"
          type="button"
          onClick={() => {
            onApply &&
              onApply({
                topline: newTopline,
                toplineTypeSize: newToplineTypeSize,
                header: newHeader,
                headerTypeSize: newHeaderTypeSize,
                headerTextTag: newHeaderTextTag,
                subtitle: newSubtitle,
                subtitleTypeSize: newSubtitleTypeSize,
                ctaText: newCtaText,
                ctaUrl: newCtaUrl,
                ctaStyle: newCtaStyle,
              });
          }}
        >
          Update
        </KibButtonNew>
      </div>
    </div>
  );
};

export default DynamicBannerFieldsConfig;
