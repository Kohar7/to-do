import { useState } from 'react';
import { 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Checkbox, 
  IconButton, 
  Typography, 
  Box, 
  Paper, 
  Chip,
  Menu,
  MenuItem
} from '@mui/material';
import { 
  MoreVert as MoreVertIcon, 
  Star as StarIcon, 
  StarBorder as StarBorderIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';
import { useTodos } from '../context/TodoContext';

const priorityColors = {
  high: 'error',
  medium: 'warning',
  low: 'info'
} as const;

const TodoList = () => {
  const { todos, toggleTodo, deleteTodo, updateTodo } = useTodos();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTodo, setSelectedTodo] = useState<string | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, todoId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedTodo(todoId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTodo(null);
  };

  const handleDelete = () => {
    if (selectedTodo) {
      deleteTodo(selectedTodo);
      handleMenuClose();
    }
  };

  const toggleImportant = () => {
    if (selectedTodo) {
      const todo = todos.find(t => t.id === selectedTodo);
      if (todo) {
        updateTodo(selectedTodo, { 
          priority: todo.priority === 'high' ? 'low' : 'high' 
        });
      }
      handleMenuClose();
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
      {todos.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography color="text.secondary">
            No tasks yet. Click the + button to add a new task.
          </Typography>
        </Box>
      ) : (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {todos.map((todo) => {
            const labelId = `checkbox-list-label-${todo.id}`;
            // Removed unused variable
            
            return (
              <ListItem
                key={todo.id}
                disablePadding
                secondaryAction={
                  <IconButton 
                    edge="end" 
                    aria-label="more"
                    onClick={(e) => handleMenuOpen(e, todo.id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                }
                sx={{
                  mb: 1,
                  borderRadius: 2,
                  bgcolor: 'background.default',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <ListItemButton
                  role={undefined}
                  onClick={() => toggleTodo(todo.id)}
                  dense
                  sx={{ py: 1.5 }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Checkbox
                      edge="start"
                      checked={todo.completed}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={labelId}
                    primary={
                      <Typography
                        variant="body1"
                        sx={{
                          textDecoration: todo.completed ? 'line-through' : 'none',
                          color: todo.completed ? 'text.disabled' : 'text.primary',
                          fontWeight: 500,
                        }}
                      >
                        {todo.title}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                        {todo.dueDate && (
                          <Box sx={{ display: 'flex', alignItems: 'center', mr: 1.5 }}>
                            <CalendarIcon fontSize="small" sx={{ mr: 0.5, fontSize: '1rem', opacity: 0.7 }} />
                            <Typography variant="caption" color="text.secondary">
                              {formatDate(todo.dueDate)}
                            </Typography>
                          </Box>
                        )}
                        {todo.category && (
                          <Chip 
                            label={todo.category} 
                            size="small" 
                            variant="outlined"
                            sx={{ height: 20, fontSize: '0.65rem' }}
                          />
                        )}
                      </Box>
                    }
                  />
                  <Chip 
                    label={todo.priority} 
                    size="small" 
                    color={priorityColors[todo.priority]}
                    variant="outlined"
                    sx={{ 
                      height: 20, 
                      fontSize: '0.65rem',
                      minWidth: 60,
                      mr: 1
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      )}

      <Menu
        id="todo-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={toggleImportant}>
          <ListItemIcon>
            {selectedTodo && todos.find(t => t.id === selectedTodo)?.priority === 'high' ? (
              <StarBorderIcon fontSize="small" />
            ) : (
              <StarIcon fontSize="small" color="primary" />
            )}
          </ListItemIcon>
          <ListItemText>
            {selectedTodo && todos.find(t => t.id === selectedTodo)?.priority === 'high' 
              ? 'Remove from Important' 
              : 'Mark as Important'}
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default TodoList;
