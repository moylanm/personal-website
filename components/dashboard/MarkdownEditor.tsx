import { Box, Tabs, TextField } from '@mui/material';
import { MAIN_COLOR, MarkdownPreviewPaper, PublishFormTab } from '@/styles';
import React from 'react';
import { TabPanel } from './PreviewTabPanel';
import ExcerptBody from '../excerpts/ExcerptBody';

interface MarkdownEditorProps {
  bodyField: string;
  tabValue: number;
  onBodyChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTabChange: (_: React.SyntheticEvent, newValue: number) => void;
}

export function MarkdownEditor({
  bodyField,
  tabValue,
  onBodyChange,
  onTabChange
}: MarkdownEditorProps) {
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
        <Tabs 
          value={tabValue} 
          onChange={onTabChange}
          aria-label='markdown editor tabs'
          TabIndicatorProps={{
            sx: { backgroundColor: MAIN_COLOR }
          }}
          sx={{
            '& .Mui-selected': {
              color: `${MAIN_COLOR} !important`,
            },
          }}
        >
          <PublishFormTab label='Edit' />
          <PublishFormTab label='Preview' />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <TextField
          fullWidth
          id='body'
          label='Body'
          margin='normal'
          onChange={onBodyChange}
          value={bodyField}
          multiline
          rows={12}
        />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <MarkdownPreviewPaper variant='outlined'>
          <ExcerptBody body={bodyField} />
        </MarkdownPreviewPaper>
      </TabPanel>
    </>
  );
}
