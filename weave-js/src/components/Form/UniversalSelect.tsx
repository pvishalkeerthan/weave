import React from 'react';
import ReactSelect, {
  Props as ReactSelectProps,
  GroupBase,
  StylesConfig,
  ClassNamesConfig,
  SelectComponentsConfig,
} from 'react-select';
import AsyncSelect, {AsyncProps as AsyncSelectProps} from 'react-select/async';
import AsyncCreatableSelect, {
  AsyncCreatableProps as AsyncCreatableProps,
} from 'react-select/async-creatable';
import {Tailwind} from '../Tailwind';

// Common styles and components imports
import {
  getStyles,
  DropdownIndicator,
  getGroupHeading,
  CustomOption,
  getClassNames,
} from './SelectNew';
import {Icon, IconName, IconSearch} from '@wandb/weave/components/Icon';

export const SelectSizes = {
  Medium: 'medium',
  Large: 'large',
} as const;
export type SelectSize = (typeof SelectSizes)[keyof typeof SelectSizes];

export const SelectIconTypes = {
  Semantic: 'semantic',
  Action: 'action',
} as const;
export type IconType = (typeof SelectIconTypes)[keyof typeof SelectIconTypes];

export enum SelectTypes {
  NORMAL = 'normal',
  ASYNC = 'async',
  ASYNC_CREATABLE = 'async_creatable',
}

type AdditionalProps = {
  selectType?: SelectTypes; // Now explicitly included in the additional props
  size?: SelectSize;
  errorState?: boolean;
  groupDivider?: boolean;
  cursor?: string;
  isDarkMode?: boolean;
  iconName?: IconName;
  iconType?: IconType;
};

// Define a generic interface for the props of the UniversalSelect component

export const UniversalSelect = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: (
    | ReactSelectProps<Option, IsMulti, Group>
    | AsyncSelectProps<Option, IsMulti, Group>
    | AsyncCreatableProps<Option, IsMulti, Group>
  ) &
    AdditionalProps
) => {
  const size = props.size ?? 'medium';
  const showDivider = props.groupDivider ?? false;
  const GroupHeading = getGroupHeading(size, showDivider);
  const {selectType = SelectTypes.NORMAL, ...selectProps} = props;

  const customComponents = {
    DropdownIndicator,
    GroupHeading,
    Option: CustomOption,
    ...props.components,
  };
  const components = Object.assign({}, props.components, {
    DropdownIndicator,
    GroupHeading,
    Option: CustomOption,
  }) as SelectComponentsConfig<Option, IsMulti, Group>;

  // const selectProps = {
  //   ...props,
  //   components: customComponents,
  //   styles: getStyles(props),
  //   classNames: getClassNames(props),
  // };
  const styles: StylesConfig<Option, IsMulti, Group> = getStyles(
    props
  ) as StylesConfig<Option, IsMulti, Group>;
  const commonProps = {
    ...selectProps,
    components: customComponents,
    styles: styles,
    classNames: getClassNames(selectProps) as
      | ClassNamesConfig<Option, IsMulti, Group>
      | undefined,
  };

  // Decide which Select component to render based on selectType prop
  switch (selectType) {
    case SelectTypes.ASYNC:
      return (
        <Tailwind>
          <AsyncSelect<Option, IsMulti, Group>
            {...(commonProps as AsyncSelectProps<Option, IsMulti, Group>)}
          />
        </Tailwind>
      );
    case SelectTypes.ASYNC_CREATABLE:
      return (
        <Tailwind>
          <AsyncCreatableSelect<Option, IsMulti, Group>
            {...(commonProps as AsyncCreatableProps<Option, IsMulti, Group>)}
          />
        </Tailwind>
      );
    case SelectTypes.NORMAL:
    default:
      return (
        <Tailwind>
          <ReactSelect<Option, IsMulti, Group>
            {...(commonProps as ReactSelectProps<Option, IsMulti, Group>)}
          />
        </Tailwind>
      );
  }
};
