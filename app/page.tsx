import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { latestExcerpts } from './lib/data';
import { ExcerptLink, HomeTableContainer } from './ui/style';
import type { Excerpt } from './lib/definitions';

const LATEST_COUNT = 7;

export default async function Home() {
  const excerpts = await latestExcerpts(LATEST_COUNT);

  return (
    <>
      <HomeTableContainer component={Paper}>
	<Table sx={{ minWidth: 650 }}>
	  <TableHead>
	    <TableRow>
	      <TableCell>Author & Work</TableCell>
	      <TableCell align="right">Created</TableCell>
	    </TableRow>
	  </TableHead>
	  <TableBody>
	    {excerpts.map((excerpt) => <Row key={excerpt.id} excerpt={excerpt} />)}
	  </TableBody>
	</Table>
      </HomeTableContainer>
    </>
  );
}

const Row: React.FC<{ excerpt: Excerpt }> = ({ excerpt }) => {
  return (
    <>
      <TableRow
        key={excerpt.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          <ExcerptLink href={`excerpts/${excerpt.id}`}>
            {`${excerpt.author} - ${excerpt.work}`}
          </ExcerptLink>
        </TableCell>
        <TableCell align="right">{new Date(excerpt.createdAt).toDateString()}</TableCell>
      </TableRow>
    </>
  )
};
