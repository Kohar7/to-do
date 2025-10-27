import { useState } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle,
  MenuItem,
  InputAdornment,
  IconButton,
  Tooltip,
  Typography
} from '@mui/material';
import { Add as AddIcon, Close as CloseIcon, Description as DescriptionIcon, Category as CategoryIcon, Event as EventIcon, PriorityHigh as PriorityHighIcon } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useTodos } from '../context/TodoContext';

const categories = ['Work', 'Personal', 'Shopping', 'Health', 'Finance'];

const AddTodo = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  // Handle date change from date picker
  const handleDateChange = (newValue: Date | null) => {
    setDueDate(newValue);
  };
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [errors, setErrors] = useState({ title: false });

  const { addTodo } = useTodos();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory('');
    setDueDate(null);
    setPriority('medium');
    setErrors({ title: false });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setErrors({ ...errors, title: true });
      return;
    }

    addTodo({
      title: title.trim(),
      description: description.trim(),
      category: category || undefined,
      dueDate: dueDate?.toISOString(),
      priority,
    });

    handleClose();
  };

  const PriorityButton = ({ 
    level, 
    label 
  }: { 
    level: 'low' | 'medium' | 'high', 
    label: string 
  }) => (
    <Button
      variant={priority === level ? 'contained' : 'outlined'}
      color={
        level === 'high' ? 'error' : 
        level === 'medium' ? 'warning' : 'info'
      }
      size="small"
      onClick={() => setPriority(level)}
      sx={{
        textTransform: 'none',
        minWidth: '80px',
        '&.MuiButton-contained': {
          boxShadow: 'none',
        },
      }}
    >
      {label}
    </Button>
  );

  return (
    <>
      <Tooltip title="Add new task">
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
          sx={{
            borderRadius: '12px',
            textTransform: 'none',
            px: 2,
            py: 1,
            boxShadow: '0 2px 8px rgba(63, 81, 181, 0.3)',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(63, 81, 181, 0.4)',
            },
          }}
        >
          Add Task
        </Button>
      </Tooltip>

      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 1,
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight={600}>
              Add New Task
            </Typography>
            <IconButton onClick={handleClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ pt: 0, pb: 2 }}>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Task Title"
              type="text"
              fullWidth
              variant="outlined"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (e.target.value.trim()) {
                  setErrors({ ...errors, title: false });
                }
              }}
              error={errors.title}
              helperText={errors.title ? 'Title is required' : ''}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PriorityHighIcon color={errors.title ? 'error' : 'action'} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              margin="dense"
              id="description"
              label="Description (Optional)"
              type="text"
              fullWidth
              variant="outlined"
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ alignItems: 'flex-start', mt: 1 }}>
                    <DescriptionIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <Box display="flex" gap={2} mb={2}>
              <TextField
                select
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                fullWidth
                variant="outlined"
                margin="dense"
                sx={{ minWidth: 150 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CategoryIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {categories.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Due Date"
                  value={dueDate}
                  onChange={handleDateChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                      margin: 'dense',
                      InputProps: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <EventIcon color="action" />
                          </InputAdornment>
                        ),
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </Box>

            <Box mt={2} mb={1}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Priority
              </Typography>
              <Box display="flex" gap={1}>
                <PriorityButton level="high" label="High" />
                <PriorityButton level="medium" label="Medium" />
                <PriorityButton level="low" label="Low" />
              </Box>
            </Box>
          </DialogContent>
          
          <DialogActions sx={{ px: 3, pb: 3, pt: 0 }}>
            <Button 
              onClick={handleClose} 
              color="inherit"
              sx={{ borderRadius: '8px', textTransform: 'none' }}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              sx={{ 
                borderRadius: '8px',
                textTransform: 'none',
                px: 3,
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: '0 2px 4px rgba(63, 81, 181, 0.3)',
                },
              }}
            >
              Add Task
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default AddTodo;
