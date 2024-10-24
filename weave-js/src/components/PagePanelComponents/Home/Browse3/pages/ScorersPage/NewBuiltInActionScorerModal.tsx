import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import React, {FC, useEffect, useState} from 'react';

import {
  ConfiguredAction,
  ConfiguredActionSchema,
  knownBuiltinActions,
} from '../../collections/actionCollection';
import {DynamicConfigForm} from '../../DynamicConfigForm';
import {ReusableDrawer} from '../../ReusableDrawer';

interface NewBuiltInActionScorerModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (newAction: ConfiguredAction) => void;
}

export const NewBuiltInActionScorerModal: FC<
  NewBuiltInActionScorerModalProps
> = ({open, onClose, onSave}) => {
  const [name, setName] = useState('');
  const [selectedActionIndex, setSelectedActionIndex] = useState<number>(0);
  const [config, setConfig] = useState<Record<string, any>>({});

  useEffect(() => {
    // Reset config when action type changes
    setConfig({});
  }, [selectedActionIndex]);

  const handleSave = () => {
    const newAction = ConfiguredActionSchema.parse({
      name,
      action: knownBuiltinActions[selectedActionIndex].action,
      config: knownBuiltinActions[selectedActionIndex].convertToConfig(config),
    });
    onSave(newAction);
  };

  const [isValid, setIsValid] = useState(false);

  return (
    <ReusableDrawer
      open={open}
      title="Configure new built-in action scorer"
      onClose={onClose}
      onSave={handleSave}
      saveDisabled={!isValid}>
      <TextField
        fullWidth
        label="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Action Type</InputLabel>
        <Select
          value={selectedActionIndex}
          onChange={e =>
            setSelectedActionIndex(parseInt(e.target.value as string, 10))
          }>
          {knownBuiltinActions.map(({action}, ndx) => (
            <MenuItem key={action.name} value={ndx}>
              {action.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedActionIndex !== -1 && (
        <DynamicConfigForm
          configSchema={knownBuiltinActions[selectedActionIndex].configSpec}
          config={config}
          setConfig={setConfig}
          onValidChange={setIsValid}
        />
      )}
    </ReusableDrawer>
  );
};
