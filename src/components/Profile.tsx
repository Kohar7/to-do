import { useState } from 'react';
import { 
  Avatar,
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment
} from '@mui/material';
import { 
  Edit as EditIcon,
  Save as SaveIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Work as WorkIcon
} from '@mui/icons-material';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(123) 456-7890',
    position: 'Senior Developer',
    avatar: '/default-avatar.png'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically make an API call to save the profile
    console.log('Profile updated:', profile);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight={600}>
          My Profile
        </Typography>
        {!isEditing ? (
          <Button 
            variant="contained" 
            startIcon={<EditIcon />}
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>
        ) : (
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<SaveIcon />}
            onClick={handleSave}
          >
            Save Changes
          </Button>
        )}
      </Box>

      <Paper 
        elevation={2} 
        sx={{ 
          p: 4, 
          borderRadius: 2,
          maxWidth: 800,
          mx: 'auto'
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar 
              src={profile.avatar} 
              sx={{ 
                width: 150, 
                height: 150, 
                mb: 2,
                fontSize: '3rem'
              }}
            >
              {profile.name.charAt(0)}
            </Avatar>
            {isEditing && (
              <Button 
                variant="outlined" 
                size="small"
                sx={{ mt: 1 }}
              >
                Change Photo
              </Button>
            )}
          </Box>
          
          <Box sx={{ flex: 1 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Full Name
              </Typography>
              {isEditing ? (
                <TextField
                  fullWidth
                  variant="outlined"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              ) : (
                <Typography variant="body1">{profile.name}</Typography>
              )}
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Email Address
              </Typography>
              {isEditing ? (
                <TextField
                  fullWidth
                  variant="outlined"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              ) : (
                <Typography variant="body1">{profile.email}</Typography>
              )}
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Phone Number
              </Typography>
              {isEditing ? (
                <TextField
                  fullWidth
                  variant="outlined"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              ) : (
                <Typography variant="body1">{profile.phone}</Typography>
              )}
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Position
              </Typography>
              {isEditing ? (
                <TextField
                  fullWidth
                  variant="outlined"
                  name="position"
                  value={profile.position}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <WorkIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              ) : (
                <Typography variant="body1">{profile.position}</Typography>
              )}
            </Box>
          </Box>
        </Box>

        {isEditing && (
          <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Change Password</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 500 }}>
              <TextField
                fullWidth
                label="Current Password"
                type="password"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="New Password"
                type="password"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Confirm New Password"
                type="password"
                variant="outlined"
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                <Button variant="contained" color="primary">
                  Update Password
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Profile;
