import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { fetchLatestExcerpts } from "./lib/data";
import { StyledLink, HomeTableContainer } from "./ui/style";
import type { Excerpt } from "./lib/definitions";
import { unstable_cache } from "next/cache";

const LATEST_COUNT = 7;

const getLatestExcerpts = unstable_cache(
  async () => {
    return await fetchLatestExcerpts(LATEST_COUNT);
  },
  ['latest'],
  { revalidate: 3600, tags: ['latest'] }
);

export default async function Home() {
  const latestExcerpts = await getLatestExcerpts();

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
	    {latestExcerpts.map((excerpt) => <Row key={excerpt.id} excerpt={excerpt} />)}
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
          <StyledLink href={`excerpts/${excerpt.id}`}>
            {`${excerpt.author} - ${excerpt.work}`}
          </StyledLink>
        </TableCell>
        <TableCell align="right">{new Date(excerpt.createdAt).toDateString()}</TableCell>
      </TableRow>
    </>
  )
}

