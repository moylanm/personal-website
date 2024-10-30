import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { fetchAllExcerpts, fetchLatestExcerpts } from "./_lib/data";
import { StyledLink, StyledTableContainer } from "./_ui/style";
import type { Excerpt } from "./_lib/definitions";
import { cache } from "react";

const LATEST_COUNT = 7;

const getLatestExcerpts = cache(async () => {
  const allExcerpts = await fetchAllExcerpts();

  let excerpts = allExcerpts.slice(-LATEST_COUNT);

  if (!excerpts) {
    excerpts = await fetchLatestExcerpts(LATEST_COUNT);
  }

  return excerpts;
});

export default async function Home() {
  const latestExcerpts = await getLatestExcerpts();

  return (
    <>
      <StyledTableContainer component={Paper}>
	<Table sx={{ minWidth: 650 }}>
	  <TableHead>
	    <TableRow>
	      <TableCell>Author & Work</TableCell>
	      <TableCell align="right">Created</TableCell>
	    </TableRow>
	  </TableHead>
	  <TableBody>
	    {latestExcerpts.map((excerpt) => <Row key={excerpt.id} excerpt={excerpt} />)}
	  </TableBody>
	</Table>
      </StyledTableContainer>
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
          <StyledLink href={`excerpts/${excerpt.id}`}>
            {`${excerpt.author} - ${excerpt.work}`}
          </StyledLink>
        </TableCell>
        <TableCell align="right">{new Date(excerpt.created_at).toDateString()}</TableCell>
      </TableRow>
    </>
  )
}

