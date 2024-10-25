/**
 * Override the grid column menu to not show the "Manage columns" item
 * as we implement our own UI outside the grid for this. We still want the "Hide column" item,
 * which is inconveniently tied to the "Manage columns" item in `columnMenuColumnsItem`.
 */
import {
  GridColumnMenu,
  GridColumnMenuHideItem,
  GridColumnMenuProps,
} from '@mui/x-data-grid-pro';
import {Button} from '@wandb/weave/components/Button';
import React from 'react';

type Slots = Record<string, React.JSXElementConstructor<any> | null>;

// See: https://mui.com/x/react-data-grid/column-menu/#customize-column-menu-items
export const CallsCustomColumnMenu = (props: GridColumnMenuProps) => {
  const slots: Slots = {columnMenuColumnsItem: null};
  if (props.colDef.field === 'feedback') {
    slots.columnMenuUserItem = ConfigureFeedbackMenu;
  } else if (props.colDef.hideable ?? true) {
    slots.columnMenuUserItem = GridColumnMenuHideItem;
  }
  return <GridColumnMenu {...props} slots={slots} />;
};

const ConfigureFeedbackMenu = () => {
  return (
    <div className="w-full items-center justify-center">
      <Button variant="ghost">Configure feedback</Button>
    </div>
  );
};
