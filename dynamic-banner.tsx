import React, { useEffect, useState } from 'react';

// Components
import Select from 'components/common/select';
import ConfigureWidgetContainer from 'pages/widgets/authoring/configure-widget-container';
import ConfigureWidgetButtons from 'pages/widgets/authoring/configure-widget-buttons';
import WidgetContainer from 'pages/widgets/authoring/widget-container';
import { getRecipesFromWidgetVariant } from 'pages/widgets/utils';
import { WidgetVariants } from 'types/widget/widget-variant-types';
import {
  TypeSize,
  TextTag,
  ButtonStyle,
} from 'types/widget/widget-style-types';
import {
  VerticalAlign,
  HorizontalAlign,
} from 'types/widget/widget-alignment-types';
import widgetFieldStyles from 'pages/widgets/authoring/widget-field/widget-field.module.scss';
import WidgetConfig, {
  DynamicBannerConfigFields,
} from './dynamic-banner-dialog-config';
import DynamicBannerFieldsConfig from './dynamic-banner-dialog-fields';
import styles from './dynamic-banner.module.scss';

export interface DynamicBannerFields {
  header: string;
  headerTypeSize: TypeSize;
  headerTextTag: TextTag;
  subtitle: string;
  subtitleTypeSize: TypeSize;
  topline: string;
  toplineTypeSize: TypeSize;
  ctaText: string;
  ctaUrl: string;
  ctaStyle: ButtonStyle;
}

export interface DynamicBannerProps {
  onCancel: () => void;
}

const DynamicBanner = ({ onCancel }: DynamicBannerProps) => {
  // Page Setup
  const [recipe, setRecipe] = useState<string>('');

  const [creativeName, setCreativeName] = useState<string>('');
  const [accessibilityLabel, setAccessibilityLabel] = useState<string>('');
  const [altText, setAltText] = useState<string>('');

  const [header, setHeader] = useState<string>('');
  const [headerTypeSize, setHeaderTypeSize] = useState<TypeSize>(
    TypeSize.LEVEL1,
  );
  const [headerTextTag, setHeaderTextTag] = useState<TextTag>(TextTag.H1);

  const [subtitle, setSubtitle] = useState<string>('');
  const [subtitleTypeSize, setSubtitleTypeSize] = useState<TypeSize>(
    TypeSize.LEVEL1,
  );

  const [topline, setTopline] = useState<string>('');
  const [toplineTypeSize, setToplineTypeSize] = useState<TypeSize>(
    TypeSize.LEVEL1,
  );

  const [ctaText, setCtaText] = useState<string>('');
  const [ctaUrl, setCtaUrl] = useState<string>('');
  const [ctaStyle, setCtaStyle] = useState<ButtonStyle>(ButtonStyle.NAVY_BLUE);
  const [isCtaSet, setIsCtaSet] = useState<boolean>(true);

  const [contentHorizontalAlign, setContentHorizontalAlign] =
    useState<HorizontalAlign>(HorizontalAlign.LEFT);
  const [contentVerticalAlign, setContentVerticalAlign] =
    useState<VerticalAlign>(VerticalAlign.TOP);
  const [textAlign, setTextAlign] = useState<HorizontalAlign>(
    HorizontalAlign.LEFT,
  );

  const bannerRecipes = getRecipesFromWidgetVariant(
    WidgetVariants.STATIC_BANNER,
  );

  const handleOnRecipeChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setRecipe(event.target.value as string);
  };

  const handleConfigApply = ({
    creativeName: newCreativeName,
    accessibilityLabel: newAccessibilityLabel,
    contentHorizontalAlign: newContentHorizontalAlign,
    contentVerticalAlign: newContentVerticalAlign,
    textAlign: newTextAlign,
    altText: newAltText,
  }: DynamicBannerConfigFields) => {
    newCreativeName !== '' && setCreativeName(newCreativeName);
    setContentHorizontalAlign(newContentHorizontalAlign);
    setContentVerticalAlign(newContentVerticalAlign);
    setTextAlign(newTextAlign);
    newAccessibilityLabel !== '' &&
      setAccessibilityLabel(newAccessibilityLabel);
    newAltText !== '' && setAltText(newAltText);
  };

  const configPopover = (
    <WidgetConfig
      creativeName={creativeName}
      accessibilityLabel={accessibilityLabel}
      contentHorizontalAlign={contentHorizontalAlign}
      contentVerticalAlign={contentVerticalAlign}
      textAlign={textAlign}
      altText={altText}
      onApply={handleConfigApply}
    />
  );

  const handleApply = ({
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
  }: DynamicBannerFields) => {
    newTopline !== '' && setTopline(newTopline);
    (newToplineTypeSize as string) !== '' &&
      setToplineTypeSize(newToplineTypeSize);

    newHeader !== '' && setHeader(newHeader);
    setHeaderTypeSize(newHeaderTypeSize);
    setHeaderTextTag(newHeaderTextTag);

    newSubtitle !== '' && setSubtitle(newSubtitle);
    setSubtitleTypeSize(newSubtitleTypeSize);

    setCtaText(newCtaText);
    setCtaUrl(newCtaUrl);
    setCtaStyle(newCtaStyle);
  };

  useEffect(() => {
    setIsCtaSet(ctaText !== '' && ctaUrl !== '');
  }, [ctaText, ctaUrl]);

  return (
    <>
      <ConfigureWidgetContainer
        data-testid="dynamic-banner"
        options={
          <Select
            label="Recipe"
            className={styles.dynamicBanner__recipeSelector}
            value={recipe}
            options={[...bannerRecipes]}
            onChange={handleOnRecipeChange}
          />
        }
      >
        <WidgetContainer configContent={configPopover}>
          <div className={styles.dynamicBanner__contents}>
            <div className={widgetFieldStyles.widgetFieldTrigger}>
              <span
                className={styles.dynamicBanner__triggerText}
                dangerouslySetInnerHTML={{ __html: topline || 'Topline' }}
              ></span>
            </div>

            <div className={widgetFieldStyles.widgetFieldTrigger}>
              <span
                className={styles.dynamicBanner__triggerText}
                dangerouslySetInnerHTML={{ __html: header || 'Header' }}
              ></span>
            </div>

            <div className={widgetFieldStyles.widgetFieldTrigger}>
              <span
                className={styles.dynamicBanner__triggerText}
                dangerouslySetInnerHTML={{ __html: subtitle || 'Subtitle' }}
              ></span>
            </div>

            {isCtaSet && (
              <div className={widgetFieldStyles.widgetFieldTrigger}>
                <span className={styles.dynamicBanner__triggerText}>
                  {ctaText}
                </span>
              </div>
            )}
          </div>
        </WidgetContainer>
      </ConfigureWidgetContainer>

      <DynamicBannerFieldsConfig
        {...{
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
        }}
        onApply={handleApply}
      />

      <ConfigureWidgetButtons
        onCancel={onCancel}
        onSave={() => {
          alert('Save the Dynamic Banner widget');
        }}
      />
    </>
  );
};

export default DynamicBanner;
