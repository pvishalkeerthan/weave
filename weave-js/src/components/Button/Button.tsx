/**
 * This button component is built to July 2023 specifications from the design team
 * This version can be used in Tailwind contexts.
 * https://www.figma.com/file/01KWBdMZg5QM9SRS1pQq0z/Design-System----Robot-Styles?type=design&node-id=5956-31813&mode=design&t=Gm4WWGWwgjdfUUTe-0
 */

import {type TooltipContentProps} from '@radix-ui/react-tooltip';
import classNames from 'classnames';
import React, {
  forwardRef,
  type PropsWithChildren,
  type ReactElement,
  useState,
} from 'react';
import {twMerge} from 'tailwind-merge';

import {Icon, type IconName} from '../Icon';
import * as Tooltip from '../RadixTooltip';
import {Tailwind} from '../Tailwind';
import type {ButtonSize, ButtonVariant} from './types';

type IconButtonProps = {
  icon: IconName;
  children?: never;
  startIcon?: never;
  endIcon?: never;
  'aria-label': string;
};

type LabelButtonProps = {
  icon?: never;
  children: ReactElement | string;
  startIcon?: IconName;
  endIcon?: IconName;
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize;
  variant?: ButtonVariant;
  children?: ReactElement | string;
  active?: boolean;
  tooltip?: string;
  tooltipProps?: TooltipContentProps;
} & (IconButtonProps | LabelButtonProps);

const sizeClasses = {
  small: 'gap-6 px-6 py-3 text-sm leading-[18px] [&_svg]:h-16 [&_svg]:w-16',
  medium: 'gap-10 px-10 py-4 text-base [&_svg]:h-18 [&_svg]:w-18',
  large: 'gap-8 px-12 py-8 text-base [&_svg]:h-20 [&_svg]:w-20',
};

const iconOnlySizeClasses = {
  small: 'h-24 w-24 p-0',
  medium: 'h-32 w-32 p-0',
  large: 'h-40 w-40 p-0',
};

const variantClasses = {
  primary: 'bg-teal-500 text-white hover:bg-teal-450',
  secondary:
    'bg-oblivion/[0.05] dark:bg-moonbeam/[0.05] text-moon-800 dark:text-moon-200 hover:bg-teal-300/[0.48] hover:text-teal-600 dark:hover:bg-teal-700/[0.48] dark:hover:text-teal-400',
  ghost:
    'text-moon-800 dark:text-moon-200 hover:bg-teal-300/[0.48] hover:text-teal-600 dark:hover:bg-teal-700/[0.48] dark:hover:text-teal-400',
  quiet: 'text-moon-500 hover:text-moon-800 dark:hover:text-moon-200',
  destructive: 'bg-red-500 text-white hover:bg-red-450',
};

const activeVariantClasses = {
  primary: 'bg-teal-450',
  secondary:
    'bg-teal-300/[0.48] text-teal-600 dark:bg-teal-700/[0.48] dark:text-teal-400',
  ghost:
    'bg-teal-300/[0.48] text-teal-600 dark:bg-teal-700/[0.48] dark:text-teal-400',
  quiet:
    'bg-oblivion/[0.05] text-moon-800 dark:bg-moonbeam/[0.05] dark:text-moon-200',
  destructive: 'bg-red-450',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = 'medium',
      variant = 'primary',
      icon,
      startIcon,
      endIcon,
      active,
      children,
      className,
      tooltip,
      tooltipProps,
      ...htmlAttributes
    },
    ref
  ) => {
    const classes = twMerge(
      classNames(
        // Display
        'inline-flex items-center justify-center',
        // Font
        "font-['Source_Sans_Pro'] font-semibold",
        // Disabled
        'disabled:pointer-events-none disabled:opacity-35',
        // Focused
        'focus-visible:outline focus-visible:outline-[2px] focus-visible:outline-teal-500',
        // Other
        'night-aware whitespace-nowrap rounded border-none',
        sizeClasses[size],
        variantClasses[variant],
        // Conditional classes
        {
          [iconOnlySizeClasses[size]]: Boolean(icon),
          [activeVariantClasses[variant]]: active,
        },
        className
      )
    );

    return (
      <Tailwind
        /**
         * The Tailwind wrapper is a div, which is a block-element. However, a normal button
         * wouldn't be wrapped and would be inline-block by default. These styles are a
         * necessary workaround to ensure Button is styled correctly despite the wrapper.
         */
        style={{display: 'contents'}}>
        <OptionalTooltip tooltip={tooltip} tooltipProps={tooltipProps}>
          <button
            ref={ref}
            {...htmlAttributes}
            type="button"
            aria-disabled={htmlAttributes.disabled}
            aria-label={htmlAttributes['aria-label'] || tooltip}
            className={classes}>
            {icon ? (
              <Icon name={icon} role="presentation" />
            ) : (
              <>
                {startIcon && <Icon name={startIcon} role="presentation" />}
                {children}
                {endIcon && <Icon name={endIcon} role="presentation" />}
              </>
            )}
          </button>
        </OptionalTooltip>
      </Tailwind>
    );
  }
);

function OptionalTooltip({
  children,
  tooltip,
  tooltipProps,
}: PropsWithChildren<{tooltip?: string; tooltipProps?: TooltipContentProps}>) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  if (tooltip) {
    return (
      <Tooltip.Provider>
        <Tooltip.Root open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
          <Tooltip.Trigger asChild>
            {/* span is needed so tooltip works on disabled buttons */}
            <span>{children}</span>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content {...tooltipProps}>{tooltip}</Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    );
  }

  return <>{children}</>;
}
