import { ExampleFile, FileType } from 'helper-models';

export const translationsUsage: ExampleFile[] = [
  {
    type: FileType.TS,
    name: 'translations-usage.module.ts',
    content: require('!!raw-loader?lang=typescript!./example/translations-usage/translations-usage.module.md')
  },
  {
    type: FileType.TS,
    name: 'translations-usage.component.ts',
    content: require('!!raw-loader?lang=typescript!./example/translations-usage/translations-usage.component.ts')
  },
  {
    type: FileType.HTML,
    name: 'translations-usage.component.html',
    content: require('!!raw-loader?lang=html!./example/translations-usage/translations-usage.component.html')
  }
];

export const translationsNoDataUsage: ExampleFile[] = [
  {
    type: FileType.TS,
    name: 'translations-no-data-usage.module.ts',
    content: require('!!raw-loader?lang=typescript!./example/translations-no-data-usage/translations-no-data-usage.module.md')
  },
  {
    type: FileType.TS,
    name: 'translations-no-data-usage.component.ts',
    content: require(
      '!!raw-loader?lang=typescript!./example/translations-no-data-usage/translations-no-data-usage.component.ts')
  },
  {
    type: FileType.HTML,
    name: 'translations-no-data-usage.component.html',
    content: require('!!raw-loader?lang=html!./example/translations-no-data-usage/translations-no-data-usage.component.html')
  }
]

export const translationsPaginationUsage: ExampleFile[] = [
  {
    type: FileType.TS,
    name: 'translations-pagination-usage.module.ts',
    content: require('!!raw-loader?lang=typescript!./example/translations-pagination-usage/translations-pagination-usage.module.md')
  },
  {
    type: FileType.TS,
    name: 'translations-pagination-usage.component.ts',
    content: require('!!raw-loader?lang=typescript!./example/translations-pagination-usage/translations-pagination-usage.component.ts')
  },
  {
    type: FileType.HTML,
    name: 'translations-pagination-usage.component.html',
    content: require(
      '!!raw-loader?lang=html!./example/translations-pagination-usage/translations-pagination-usage.component.html')
  }
];

export const demoSnippet: any = {
  translations: require('!!raw-loader?lang=typescript!./docs/translations.md')
};