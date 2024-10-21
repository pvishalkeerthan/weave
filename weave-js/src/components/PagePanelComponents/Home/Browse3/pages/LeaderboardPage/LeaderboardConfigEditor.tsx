import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  Add as AddIcon,
  ArrowDownward as MoveDownIcon,
  ArrowUpward as MoveUpIcon,
  Delete as DeleteIcon,
  FileCopy as CloneIcon,
} from '@material-ui/icons';
import React from 'react';

import {PythonLeaderboardObjectVal} from '../../views/Leaderboard/types/leaderboardConfigType';

// Placeholder data for dropdowns
const evaluationObjects = ['Evaluation1', 'Evaluation2', 'Evaluation3'];
const scorerNames = ['Scorer1', 'Scorer2', 'Scorer3'];
const metricPaths = ['Metric1', 'Metric2', 'Metric3'];

export const LeaderboardConfigEditor: React.FC<{
  leaderboardVal: PythonLeaderboardObjectVal;
  saving: boolean;
  isDirty: boolean;
  setWorkingCopy: (leaderboardVal: PythonLeaderboardObjectVal) => void;
  discardChanges: () => void;
  commitChanges: () => void;
}> = ({
  leaderboardVal,
  saving,
  isDirty,
  setWorkingCopy,
  discardChanges,
  commitChanges,
}) => {
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWorkingCopy({...leaderboardVal, name: event.target.value});
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWorkingCopy({...leaderboardVal, description: event.target.value});
  };

  const handleColumnChange = (index: number, field: string, value: any) => {
    const newColumns = [...leaderboardVal.columns];
    newColumns[index] = {...newColumns[index], [field]: value};
    setWorkingCopy({...leaderboardVal, columns: newColumns});
  };

  const addColumn = () => {
    setWorkingCopy({
      ...leaderboardVal,
      columns: [
        ...leaderboardVal.columns,
        {
          evaluation_object_ref: '',
          scorer_name: '',
          should_minimize: false,
          summary_metric_path_parts: [],
        },
      ],
    });
  };

  const removeColumn = (index: number) => {
    const newColumns = leaderboardVal.columns.filter((_, i) => i !== index);
    setWorkingCopy({...leaderboardVal, columns: newColumns});
  };

  const cloneColumn = (index: number) => {
    const newColumns = [...leaderboardVal.columns];
    newColumns.splice(index + 1, 0, {...newColumns[index]});
    setWorkingCopy({...leaderboardVal, columns: newColumns});
  };

  const moveColumn = (fromIndex: number, toIndex: number) => {
    const newColumns = [...leaderboardVal.columns];
    const [removed] = newColumns.splice(fromIndex, 1);
    newColumns.splice(toIndex, 0, removed);
    setWorkingCopy({...leaderboardVal, columns: newColumns});
  };

  return (
    <Box display="flex" flexDirection="column" height="100%" width="100%">
      <Box flexGrow={1} overflow="auto" p={2}>
        <Typography variant="h6" gutterBottom>
          Display Name
        </Typography>
        <TextField
          fullWidth
          value={leaderboardVal.name}
          onChange={handleNameChange}
          margin="normal"
        />
        <Typography variant="h6" gutterBottom style={{marginTop: 16}}>
          Description
        </Typography>
        <TextField
          fullWidth
          value={leaderboardVal.description}
          onChange={handleDescriptionChange}
          margin="normal"
          multiline
          rows={6}
          InputProps={{style: {fontFamily: 'monospace', minHeight: '120px'}}}
        />
        <Typography variant="h6" gutterBottom style={{marginTop: 16}}>
          Columns
        </Typography>
        {leaderboardVal.columns.map((column, index) => (
          <Grid
            container
            spacing={2}
            key={index}
            alignItems="center"
            style={{marginBottom: 8}}>
            <Grid item xs={12} sm={3}>
              <Select
                fullWidth
                value={column.evaluation_object_ref}
                onChange={e =>
                  handleColumnChange(
                    index,
                    'evaluation_object_ref',
                    e.target.value
                  )
                }
                displayEmpty
                margin="dense">
                <MenuItem value="">
                  <em>Select Evaluation Object</em>
                </MenuItem>
                {evaluationObjects.map(obj => (
                  <MenuItem key={obj} value={obj}>
                    {obj}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Select
                fullWidth
                value={column.scorer_name}
                onChange={e =>
                  handleColumnChange(index, 'scorer_name', e.target.value)
                }
                displayEmpty
                margin="dense">
                <MenuItem value="">
                  <em>Select Scorer</em>
                </MenuItem>
                {scorerNames.map(scorer => (
                  <MenuItem key={scorer} value={scorer}>
                    {scorer}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Select
                fullWidth
                multiple
                value={column.summary_metric_path_parts}
                onChange={e =>
                  handleColumnChange(
                    index,
                    'summary_metric_path_parts',
                    e.target.value
                  )
                }
                renderValue={selected => (selected as string[]).join(' > ')}
                displayEmpty
                margin="dense">
                <MenuItem value="">
                  <em>Select Metric Path</em>
                </MenuItem>
                {metricPaths.map(path => (
                  <MenuItem key={path} value={path}>
                    {path}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={6} sm={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={column.should_minimize}
                    onChange={e =>
                      handleColumnChange(
                        index,
                        'should_minimize',
                        e.target.checked
                      )
                    }
                  />
                }
                label="Minimize"
              />
            </Grid>
            <Grid item xs={6} sm={1}>
              <Box display="flex" justifyContent="flex-end">
                <IconButton
                  size="small"
                  onClick={() => moveColumn(index, index - 1)}
                  disabled={index === 0}>
                  <MoveUpIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => moveColumn(index, index + 1)}
                  disabled={index === leaderboardVal.columns.length - 1}>
                  <MoveDownIcon />
                </IconButton>
                <IconButton size="small" onClick={() => cloneColumn(index)}>
                  <CloneIcon />
                </IconButton>
                <IconButton size="small" onClick={() => removeColumn(index)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        ))}
        <Button startIcon={<AddIcon />} onClick={addColumn}>
          Add Column
        </Button>
      </Box>
      <Box
        flexShrink={0}
        p={2}
        borderTop={1}
        borderColor="divider"
        height="52px"
        display="flex"
        alignItems="center"
        justifyContent="flex-end">
        <Button
          variant="outlined"
          onClick={discardChanges}
          disabled={saving}
          style={{marginRight: 8}}>
          {isDirty ? 'Discard' : 'Close'}
        </Button>
        {isDirty && (
          <Button
            variant="contained"
            color="primary"
            onClick={commitChanges}
            disabled={saving}>
            Save
          </Button>
        )}
      </Box>
    </Box>
  );
};
