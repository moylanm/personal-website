import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { fetchLatestExcerpts } from "./lib/data";
import { StyledLink, StyledTableContainer } from "./ui/style";
import type { Excerpt } from "./lib/definitions";

export default async function Home() {
  const latest = await fetchLatestExcerpts(7);

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
						{latest.map((excerpt) => <Row key={excerpt.id} excerpt={excerpt} />)}
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

