import { Box } from '@mui/material';
import Markdown from 'react-markdown';

const ExcerptBody: React.FC<{ body: string }> = ({ body }) => {
  return (
    <Box
      component='article'
      sx={{
        '& p': {
          mb: 2,
          lineHeight: 1.7,
          fontSize: '1.1rem'
        },
        '& blockquote': {
          borderLeft: 4,
          borderColor: '#686868',
          pl: 2,
          ml: 0,
          fontStyle: 'italic'
        }
      }}
    >
      <Markdown>
        {body}
      </Markdown>
    </Box>
  );
}

export default ExcerptBody;