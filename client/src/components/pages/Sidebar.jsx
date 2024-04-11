import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem component={Link} to="/" button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Інформаційна панель" />
          </ListItem>
          <ListItem component={Link} to="/studentsBalance" button>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Особові рахунки" />
          </ListItem>
          <ListItem component={Link} to="/payment" button>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Платежі" />
          </ListItem>
          <ListItem component={Link} to="/students" button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Студенти" />
          </ListItem>
          <ListItem component={Link} to="/courses" button>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Курси" />
          </ListItem>
          <ListItem component={Link} to="/users" button>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Користувачі" />
          </ListItem>
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
